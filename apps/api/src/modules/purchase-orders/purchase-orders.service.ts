import { Injectable, NotFoundException } from '@nestjs/common';
import { PurchaseOrderStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class PurchaseOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.purchaseOrder.findMany({ include: { project: true, supplier: true, purchaseRequest: true, supplierQuote: true }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const entity = await this.prisma.purchaseOrder.findUnique({ where: { id }, include: { project: true, supplier: true, purchaseRequest: true, supplierQuote: true } });
    if (!entity) throw new NotFoundException('Pedido não encontrado');
    return entity;
  }

  create(data: any) {
    return this.prisma.purchaseOrder.create({ data: { ...data, totalAmount: Number(data.totalAmount || 0) } });
  }

  async createFromQuote(supplierQuoteId: string) {
    const quote = await this.prisma.supplierQuote.findUnique({ where: { id: supplierQuoteId }, include: { purchaseRequest: true } });
    if (!quote) throw new NotFoundException('Cotação não encontrada');

    return this.prisma.purchaseOrder.create({
      data: {
        code: `PC-${Date.now()}`,
        projectId: quote.purchaseRequest.projectId,
        supplierId: quote.supplierId,
        purchaseRequestId: quote.purchaseRequestId,
        supplierQuoteId: quote.id,
        totalAmount: Number(quote.totalAmount),
        status: PurchaseOrderStatus.APPROVED,
      },
    });
  }

  async issue(id: string) {
    await this.findOne(id);
    return this.prisma.purchaseOrder.update({ where: { id }, data: { status: PurchaseOrderStatus.ISSUED } });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.purchaseOrder.update({ where: { id }, data: { ...data, totalAmount: data.totalAmount !== undefined ? Number(data.totalAmount) : undefined } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.purchaseOrder.delete({ where: { id } });
  }
}
