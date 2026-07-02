import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { SupplierQuotesController } from './supplier-quotes.controller';
import { SupplierQuotesService } from './supplier-quotes.service';

@Module({
  controllers: [SupplierQuotesController],
  providers: [SupplierQuotesService, PrismaService],
})
export class SupplierQuotesModule {}
