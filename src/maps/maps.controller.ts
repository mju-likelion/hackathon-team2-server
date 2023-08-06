import { Controller, Get, Param } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('/detail/:id')
  getMapDetail(@Param('id') id: string) {
    return this.mapsService.mapDetail(id);
  }
}
