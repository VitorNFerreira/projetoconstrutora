import { Injectable, NotFoundException } from '@nestjs/common';
import { BudgetStatus, ProjectStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.budget.findMany({ include: { client: true, project: true }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.budget.findUnique({ where: { id }, include: { client: true, project: true } });
    if (!entity) throw new NotFoundException('Orçamento não encontrado');
    return entity;
  }

  create(data: any) {
    const saleAmount = Number(data.saleAmount || 0);
    const costAmount = Number(data.costAmount || 0);
    return this.prisma.budget.create({
      data: {
        ...data,
        saleAmount,
        costAmount,
        marginAmount: saleAmount - costAmount,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    const saleAmount = data.saleAmount !== undefined ? Number(data.saleAmount) : undefined;
    const costAmount = data.costAmount !== undefined ? Number(data.costAmount) : undefined;
    const current = await this.prisma.budget.findUnique({ where: { id } });
    const nextSale = saleAmount ?? Number(current?.saleAmount || 0);
    const nextCost = costAmount ?? Number(current?.costAmount || 0);

    return this.prisma.budget.update({
      where: { id },
      data: {
        ...data,
        saleAmount,
        costAmount,
        marginAmount: nextSale - nextCost,
      },
    });
  }

  async approve(id: string) {
    const budget = await this.findOne(id);
    if (budget.project) return budget.project;

    await this.prisma.budget.update({ where: { id }, data: { status: BudgetStatus.APPROVED } });

    return this.prisma.project.create({
      data: {
        code: `OBR-${Date.now()}`,
        clientId: budget.clientId,
        budgetId: budget.id,
        name: budget.title,
        contractValue: Number(budget.saleAmount),
        status: ProjectStatus.PLANNING,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.budget.delete({ where: { id } });
  }
}
