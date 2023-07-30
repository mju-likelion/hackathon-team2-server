import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KakaoModule } from 'src/kakao/kakao.module';
import { StoreController } from './store.controller';

@Module({
  imports: [PrismaModule, KakaoModule],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
