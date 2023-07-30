import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KakaoService {
  async addressToCoordinate(fullAddress: string) {
    const url = 'https://dapi.kakao.com/v2/local/search/address.json';
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
      },
      params: {
        query: fullAddress,
      },
    });
    const latitude = response.data.documents[0].x;
    const longitude = response.data.documents[0].y;
    return { latitude: latitude, longitude: longitude };
  }
}
