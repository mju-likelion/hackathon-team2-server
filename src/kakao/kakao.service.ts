import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

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
        const storeInfo: StoreInfo = {
          longitude: data.x,
          latitude: data.y,
          roadNameAddress: data.road_address_name,
          fullAddress: data.address_name,
          phoneNumber: data.phone || null,
        };

        return storeInfo;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
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
  latitude: string;
  longitude: string;
  roadNameAddress: string;
  fullAddress: string;
  phoneNumber: string | null;
}
