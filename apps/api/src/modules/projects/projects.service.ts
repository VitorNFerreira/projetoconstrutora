import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.project.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Projects não encontrado');
    return entity;
  }

  create(data: any) {
    return this.prisma.project.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
