import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MapService {
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

    return {
      name: store.name,
      latitude: store.latitude,
      longitude: store.longitude,
      roadNameAddress: store.roadNameAddress,
      fullAddress: store.fullAddress,
      phoneNumber: store.phoneNumber,
    };
  }
}
