import { Controller, Get, Query } from '@nestjs/common';
import { SpecificationService } from './specification.service';

@Controller('specifications')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.specificationService.findAllWithPagination(page, limit);
  }
}
