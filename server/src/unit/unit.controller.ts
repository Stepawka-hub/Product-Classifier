import { Body, Controller, Get, Post } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Post()
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.createUnit(createUnitDto);
  }
}
