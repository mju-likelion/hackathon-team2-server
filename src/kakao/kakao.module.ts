import { Module } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { KakaoController } from './kakao.controller';

@Module({
  providers: [KakaoService],
  controllers: [KakaoController],
})
export class KakaoModule {}
