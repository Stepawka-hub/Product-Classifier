import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.unitService.findAllWithPagination(page, limit);
  }

  @Post()
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.createUnit(createUnitDto);
  }
}
