import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { KakaoModule } from '@/kakao/kakao.module';
import { StoresController } from './stores.controller';

@Module({
  imports: [PrismaModule, KakaoModule],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
