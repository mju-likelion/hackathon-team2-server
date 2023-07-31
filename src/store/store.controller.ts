import { Controller, Get, Post } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  saveStoreData() {
    return this.storeService.parseCsv();
  }
}
