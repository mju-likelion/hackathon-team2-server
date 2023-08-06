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
    @Query('maxLatitude') maxLatitude: string,
    @Query('maxLongitude') maxLongitude: string,
    @Query('minLatitude') minLatitude: string,
    @Query('minLongitude') minLongitude: string,
  ) {
    return this.storeService.getStoreData(
      maxLatitude,
      maxLongitude,
      minLatitude,
      minLongitude,
    );
  }
}
