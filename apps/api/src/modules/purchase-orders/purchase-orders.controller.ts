import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { PurchaseOrdersService } from './purchase-orders.service';

@UseGuards(JwtAuthGuard)
@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly service: PurchaseOrdersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Post('from-quote/:supplierQuoteId')
  createFromQuote(@Param('supplierQuoteId') supplierQuoteId: string) {
    return this.service.createFromQuote(supplierQuoteId);
  }

  @Post(':id/issue')
  issue(@Param('id') id: string) {
    return this.service.issue(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
