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

    // 경도, 위도, 주소명 값이 없으면 폐점으로 판단
    try {
      response.data.documents[0].x;
      response.data.documents[0].y;
      response.data.documents[0].road_address_name;
      response.data.documents[0].address_name;
    } catch (e) {
      return;
    }

    const storeInf = {
      latitude: response.data.documents[0].x,
      longitude: response.data.documents[0].y,
      roadNameAddress: response.data.documents[0].road_address_name,
      fullAddress: response.data.documents[0].address_name,
      phoneNumber: '',
    };

    // 전화번호 값이 없으면 null 값 return
    try {
      storeInf.phoneNumber = response.data.documents[0].phone;
      return storeInf;
    } catch (e) {
      storeInf.phoneNumber = null;
      return storeInf;
    }
  }
}
