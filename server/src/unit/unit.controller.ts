import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll() {
    return this.unitService.findAll();
  }
}
