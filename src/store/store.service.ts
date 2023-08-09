import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as iconv from 'iconv-lite';
import { PrismaService } from '@/prisma/prisma.service';
import { KakaoService } from '@/kakao/kakao.service';

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

    splitFullAdress.map(function (char, i) {
      if (splitRoadAddress[i] === char) {
        fullAddress = fullAddress.replace(char, '').replace(' ', '');
      }
    });

    return fullAddress;
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
          if (store) {
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
          }
        } catch (e) {
          console.error(e);
        }
      });
  }

  async storeDetail(id: string) {
    let store;
    try {
      store = await this.prismaService.store.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['존재하는 가맹점 명이 없습니다.']);
      }
    }

    let storeLocation;
    try {
      storeLocation = await this.prismaService.storeLocation.findFirstOrThrow({
        where: {
          id: store.locationIdd,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['존재하는 주소가 없습니다.']);
      }
    }

    let category;
    try {
      category = await this.prismaService.category.findUniqueOrThrow({
        where: {
          code: store.categoryCode,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['존재하는 카테고리 명이 없습니다.']);
      }
    }

    return {
      name: store.name,
      category: category.name,
      latitude: storeLocation.latitude,
      longitude: storeLocation.longitude,
      roadNameAddress: storeLocation.roadNameAddress,
      fullAddress: storeLocation.fullAddress,
      phoneNumber: store.phoneNumber,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    };
  }
}
