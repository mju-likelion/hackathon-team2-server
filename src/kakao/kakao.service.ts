import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import Decimal from 'decimal.js';

@Injectable()
export class KakaoService {
  async searchWithKeyword(placeName: string) {
    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';

    try {
      const response: AxiosResponse<KakaoResponse> = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
        },
        params: {
          query: placeName,
        },
      });

      const data = response.data.documents[0];

      if (data) {
        const longitude = new Decimal(data.x);
        const latitude = new Decimal(data.y);

        const districts = [
          '서울 강남구',
          '서울 서초구',
          '서울 동작구',
          '서울 관악구',
          '서울 송파구',
          '서울 종로구',
          '서울 중구',
          '서울 용산구',
        ];

        if (
          districts.some((district) =>
            data.road_address_name.startsWith(district),
          )
        ) {
          const storeInfo: StoreInfo = {
            longitude: longitude,
            latitude: latitude,
            roadNameAddress: data.road_address_name,
            fullAddress: data.address_name,
            phoneNumber: data.phone || null,
          };
          return storeInfo;
        }
      } else {
        return null;
      }
    } catch (e) {
      throw new InternalServerErrorException([
        '카카오 API 호출 단계에서 오류가 발생했습니다.',
      ]);
    }
  }
}

interface KakaoResponse {
  documents: {
    x: string;
    y: string;
    road_address_name: string;
    address_name: string;
    phone?: string;
  }[];
}

interface StoreInfo {
  latitude: Decimal;
  longitude: Decimal;
  roadNameAddress: string;
  fullAddress: string;
  phoneNumber: string | null;
}
