import { Controller, Get, Param } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('/:detail')
  getMapDetail(@Param('detail') id: string) {
    return this.mapService.mapDetail(id);
  }
}
