import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as iconv from 'iconv-lite';
import { PrismaService } from '@/prisma/prisma.service';
import { KakaoService } from '@/kakao/kakao.service';
import Decimal from 'decimal.js';

@Injectable()
export class StoresService {
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
            const location = await this.prismaService.location.create({
              data: {
                latitude: +store.latitude,
                longitude: +store.longitude,
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

  async getStoreData(
    maxLatitude: string,
    maxLongitude: string,
    minLatitude: string,
    minLongitude: string,
  ) {
    let locations;
    const data = [];

    try {
      const maxLat = new Decimal(maxLatitude);
      const maxLon = new Decimal(maxLongitude);
      const minLat = new Decimal(minLatitude);
      const minLon = new Decimal(minLongitude);

      locations = await this.prismaService.location.findMany({
        where: {
          latitude: {
            gte: minLat,
            lte: maxLat,
          },
          longitude: {
            gte: minLon,
            lte: maxLon,
          },
        },
        select: {
          id: true,
          latitude: true,
          longitude: true,
          roadNameAddress: true,
          fullAddress: true,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException([
        '위치 정보를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.',
      ]);
    }

    try {
      for (const location of locations) {
        const store = await this.prismaService.store.findFirstOrThrow({
          where: {
            locationId: location.id,
          },
          select: {
            id: true,
            name: true,
            categoryCode: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        const category = await this.prismaService.category.findUniqueOrThrow({
          where: {
            code: store.categoryCode,
          },
          select: {
            name: true,
          },
        });

        const storeData: StoreData = {
          id: store.id,
          name: store.name,
          category: category.name,
          latitude: location.latitude,
          longitude: location.longitude,
          fullAddress: location.fullAddress,
          roadNameAddress: location.roadNameAddress,
          createdAt: store.createdAt,
          updatedAt: store.updatedAt,
        };

        data.push(storeData);
      }

      return data;
    } catch (e) {
      throw new InternalServerErrorException([
        '가맹점 정보를 가져오는 과정에서 알 수 없는 오류가 발생했습니다.',
      ]);
    }
  }
}

interface StoreData {
  id: string;
  name: string;
  category: string;
  latitude: string;
  longitude: string;
  fullAddress: string;
  roadNameAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
