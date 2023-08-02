import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as iconv from 'iconv-lite';
import { KakaoService } from 'src/kakao/kakao.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly kakaoService: KakaoService,
  ) {}

  // 카테고리명 -> 카테고리 코드
  async nameToCode(name: string) {
    try {
      const store = await this.prismaService.category.findFirst({
        where: {
          name: name,
        },
      });
      console.log(store.code);
      return store.code;
    } catch (e) {
      console.log(e);
    }
  }

  // 지번 주소 속 '시, 구' 에 해당하는 문자열을 제외시킴
  async removeDuplicateStr(roadNameAddress: string, fullAddress: string) {
    const splitRoadAddress = roadNameAddress.split(' ');
    const splitFullAdress = fullAddress.split(' ');

    for (let i = 0; i < 2; i++) {
      if (splitRoadAddress[i] === splitFullAdress[i]) {
        fullAddress = fullAddress.replace(splitFullAdress[i], '');
      }
    }
    return fullAddress.slice(2);
  }

  async parseCsv() {
    const absoluteFilePath = process.env.CSV_FILE_PATH;

    fs.createReadStream(absoluteFilePath)
      .pipe(iconv.decodeStream('euc-kr'))
      .pipe(csvParser())
      .on('data', async (row) => {
        const store = await this.kakaoService.searchWithKeyword(
          row['가맹점명칭'],
        );

        try {
          const location = await this.prismaService.storeLocation.create({
            data: {
              latitude: store.latitude,
              longitude: store.longitude,
              fullAddress: await this.removeDuplicateStr(
                store.roadNameAddress,
                store.fullAddress,
              ),
              roadNameAddress: store.roadNameAddress,
            },
          });

          await this.prismaService.store.create({
            data: {
              locationId: location.id,
              categoryCode: await this.nameToCode(row['업종']),
              name: row['가맹점명칭'],
              phoneNumber: store.phoneNumber,
            },
          });
        } catch (e) {
          console.error(e);
        }
      });
  }
}
