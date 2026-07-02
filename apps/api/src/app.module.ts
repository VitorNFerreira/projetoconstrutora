import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PurchaseRequestsModule } from './modules/purchase-requests/purchase-requests.module';
import { SupplierQuotesModule } from './modules/supplier-quotes/supplier-quotes.module';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    AuthModule,
    ClientsModule,
    SuppliersModule,
    BudgetsModule,
    ProjectsModule,
    PurchaseRequestsModule,
    SupplierQuotesModule,
    PurchaseOrdersModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
