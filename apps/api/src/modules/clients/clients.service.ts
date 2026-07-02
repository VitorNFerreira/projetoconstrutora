import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.client.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Clients não encontrado');
    return entity;
  }

  create(data: any) {
    return this.prisma.client.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.client.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.client.delete({ where: { id } });
  }
}
