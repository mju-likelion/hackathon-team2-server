import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KakaoService {
  async searchWithKeyword(placeName: string) {
    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
      },
      params: {
        query: placeName,
      },
    });

    const datas = response.data.documents[0];

    if (datas) {
      const storeInfo = {
        latitude: datas.x,
        longitude: datas.y,
        roadNameAddress: datas.road_address_name,
        fullAddress: datas.address_name,
        phoneNumber: '',
      };

      // 전화번호 값이 없으면 null 값 return
      if (!datas.phone) {
        storeInfo.phoneNumber = null;
      } else {
        storeInfo.phoneNumber = datas.phone;
      }

      return storeInfo;
    } else {
      return null;
    }
  }
}
