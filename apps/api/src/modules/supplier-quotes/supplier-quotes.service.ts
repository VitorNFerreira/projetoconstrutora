import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierQuoteStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class SupplierQuotesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.supplierQuote.findMany({ include: { purchaseRequest: true, supplier: true, order: true }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.supplierQuote.findUnique({ where: { id }, include: { purchaseRequest: true, supplier: true, order: true } });
    if (!entity) throw new NotFoundException('Cotação não encontrada');
    return entity;
  }

  create(data: any) {
    return this.prisma.supplierQuote.create({ data: { ...data, totalAmount: Number(data.totalAmount || 0) } });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.supplierQuote.update({ where: { id }, data: { ...data, totalAmount: data.totalAmount !== undefined ? Number(data.totalAmount) : undefined } });
  }

  async selectWinner(id: string) {
    const quote = await this.findOne(id);
    await this.prisma.supplierQuote.updateMany({
      where: { purchaseRequestId: quote.purchaseRequestId, NOT: { id } },
      data: { status: SupplierQuoteStatus.REJECTED },
    });
    return this.prisma.supplierQuote.update({ where: { id }, data: { status: SupplierQuoteStatus.SELECTED } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.supplierQuote.delete({ where: { id } });
  }
}
