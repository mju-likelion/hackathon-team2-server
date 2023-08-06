import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class MapsService {
  constructor(private readonly prismaService: PrismaService) {}

  async mapDetail(id: string) {
    let store;
    try {
      store = await this.prismaService.store.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['존재하는 가맹점 명이 없습니다.']);
      }
    }

    let storeLocation;
    try {
      storeLocation = await this.prismaService.location.findFirstOrThrow({
        where: {
          id: store.locationId,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['존재하는 가맹점 명이 없습니다.']);
      }
    }

    let category;
    try {
      category = await this.prismaService.category.findFirstOrThrow({
        where: {
          code: store.categoryCode,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['존재하는 가맹점 명이 없습니다.']);
      }
    }

    return {
      name: store.name,
      category: category.name,
      latitude: storeLocation.latitude,
      longitude: storeLocation.longitude,
      roadNameAddress: storeLocation.roadNameAddress,
      fullAddress: storeLocation.fullAddress,
      phoneNumber: store.phoneNumber,
    };
  }
}
