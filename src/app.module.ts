import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { KakaoModule } from './kakao/kakao.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    KakaoModule,
    FilesModule,
    StoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
