import { Controller, Get, Query } from '@nestjs/common';
import { KakaoService } from './kakao.service';

@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Get()
  addressToCoordinate(@Query('query') fullAddress: string) {
    return this.kakaoService.addressToCoordinate(fullAddress);
  }
}
