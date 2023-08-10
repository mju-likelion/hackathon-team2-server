import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  saveStoreData() {
    return this.storesService.parseCsv();
  }

  @Get()
  getStoreDate(
    @Query('maxLatitude') maxLatitude: string,
    @Query('maxLongitude') maxLongitude: string,
    @Query('minLatitude') minLatitude: string,
    @Query('minLongitude') minLongitude: string,
  ) {
    return this.storesService.getStoreData(
      maxLatitude,
      maxLongitude,
      minLatitude,
      minLongitude,
    );
  }

  @Get('/detail/:id')
  getMapDetail(@Param('id') id: string) {
    return this.storesService.storeDetail(id);
  }
}
