import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.unitService.findAllWithPagination(page, limit);
  }

  @Post()
  createUnit(@Body() dDto: CreateUnitDto) {
    return this.unitService.createUnit(dto);
  }

  @Patch()
  updateUnit(@Body() dto: UpdateUnitDto) {
    return this.unitService.updateUnit(dto);
  }

  @Delete(':id')
  deleteUnit(@Param('id') id: number) {
    return this.unitService.deleteUnit(id);
  }
}
