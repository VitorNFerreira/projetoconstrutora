import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { SupplierQuotesService } from './supplier-quotes.service';

@UseGuards(JwtAuthGuard)
@Controller('supplier-quotes')
export class SupplierQuotesController {
  constructor(private readonly service: SupplierQuotesService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Post(':id/select')
  selectWinner(@Param('id') id: string) {
    return this.service.selectWinner(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
