import { Controller, Get, Post, Query } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  saveStoreData() {
    return this.storeService.parseCsv();
  }

  @Get()
  getStoreDate(
    @Query('maxLatitude') maxLatitude: number,
    @Query('maxLongitude') maxLongitude: number,
    @Query('minLatitude') minLatitude: number,
    @Query('minLongitude') minLongitude: number,
  ) {
    return this.storeService.getStoreData(
      maxLatitude,
      maxLongitude,
      minLatitude,
      minLongitude,
    );
  }
}
