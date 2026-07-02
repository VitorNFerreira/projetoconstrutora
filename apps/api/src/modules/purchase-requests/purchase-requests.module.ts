import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { PurchaseRequestsController } from './purchase-requests.controller';
import { PurchaseRequestsService } from './purchase-requests.service';

@Module({
  controllers: [PurchaseRequestsController],
  providers: [PurchaseRequestsService, PrismaService],
})
export class PurchaseRequestsModule {}
