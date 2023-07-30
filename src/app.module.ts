import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { KakaoModule } from './kakao/kakao.module';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    KakaoModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
