import { Controller, Post, Get, Param } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  saveStoreData() {
    return this.storeService.parseCsv();
  }

  @Get('/detail/:id')
  getStoreDetail(@Param('id') id: string) {
    return this.storeService.storeDetail(id);
  }
}
