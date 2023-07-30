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

  async parseCsv() {
    const absoluteFilePath = process.env.CSV_FILE_PATH;

    fs.createReadStream(absoluteFilePath)
      .pipe(iconv.decodeStream('euc-kr'))
      .pipe(csvParser())
      .on('data', async (row) => {
        const latitude = (
          await this.kakaoService.addressToCoordinate(row['지번주소'])
        ).latitude;
        const longitude = (
          await this.kakaoService.addressToCoordinate(row['지번주소'])
        ).longitude;

        try {
          await this.prismaService.storeLocation.create({
            data: {
              latitude: latitude,
              longitude: longitude,
              fullAddress: row['지번주소'],
              roadNameAddress: row['도로명주소'],
            },
          });

          await this.prismaService.storeInformation.create({
            data: {
              placeName: row['가맹점명칭'],
              category: row['업종'],
              phoneNumber: await this.kakaoService.searchWithKeyword(
                row['가맹점명칭'],
                latitude,
                longitude,
              ),
            },
          });
        } catch (e) {
          console.error(e);
        }
      });
  }
}
