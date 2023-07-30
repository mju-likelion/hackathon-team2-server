import { Controller, Get, Query } from '@nestjs/common';
import { KakaoService } from './kakao.service';

@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Get('/getCoordinate')
  addressToCoordinate(@Query('query') fullAddress: string) {
    return this.kakaoService.addressToCoordinate(fullAddress);
  }

  @Get('/getPhone')
  searchWithKeyword(@Query('query') placeName, latitude, longitude) {
    return this.kakaoService.searchWithKeyword(placeName, latitude, longitude);
  }
}
