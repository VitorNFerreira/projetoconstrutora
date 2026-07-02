import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.supplier.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.supplier.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Suppliers não encontrado');
    return entity;
  }

  create(data: any) {
    return this.prisma.supplier.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.supplier.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.supplier.delete({ where: { id } });
  }
}
