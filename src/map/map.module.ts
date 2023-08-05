import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
