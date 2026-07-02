import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService, PrismaService],
})
export class PurchaseOrdersModule {}
