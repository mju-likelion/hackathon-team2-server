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
        if (
          longitude.lessThanOrEqualTo(127.1378545233667) &&
          longitude.greaterThanOrEqualTo(126.95724345345953) &&
          latitude.lessThanOrEqualTo(37.56669609415292) &&
          latitude.greaterThanOrEqualTo(37.33639771464528)
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
