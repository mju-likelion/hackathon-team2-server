import { Controller, Get, Param, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getMap(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ) {
    return this.mapService.map(latitude, longitude, radius);
  }

  @Get('/detail/:id')
  getMapDetail(@Param('id') id: string) {
    return this.mapService.mapDetail(id);
  }
}
