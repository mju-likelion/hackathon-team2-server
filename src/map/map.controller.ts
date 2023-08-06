import { Controller, Get, Param, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('/detail/:id')
  getMapDetail(@Param('id') id: string) {
    return this.mapService.mapDetail(id);
  }
}
