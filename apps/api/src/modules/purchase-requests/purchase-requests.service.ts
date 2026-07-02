import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class PurchaseRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.purchaseRequest.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.purchaseRequest.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('PurchaseRequests não encontrado');
    return entity;
  }

  create(data: any) {
    return this.prisma.purchaseRequest.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.purchaseRequest.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.purchaseRequest.delete({ where: { id } });
  }
}
