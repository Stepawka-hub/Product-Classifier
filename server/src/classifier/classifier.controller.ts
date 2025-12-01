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
import { ClassifierService } from './classifier.service';
import { CreateClassifierDto } from './dto/create-classifier.dto';
import { UpdateClassifierDto } from './dto/update-classifier.dto';

@Controller('classifiers')
export class ClassifierController {
  constructor(private readonly classifierService: ClassifierService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.classifierService.findAllWithPagination(page, limit);
  }

  @Get(':id/parents')
  findParents(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.classifierService.findNodes(id, page, limit);
  }

  @Get(':id/children')
  findChildren(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.classifierService.findNodes(id, page, limit, true);
  }

  @Get(':id/leaves')
  findLeaves(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.classifierService.findLeaves(id, page, limit);
  }

  @Post()
  createClassifier(@Body() dto: CreateClassifierDto) {
    return this.classifierService.createClassifier(dto);
  }

  @Patch()
  updateClassifier(@Body() dto: UpdateClassifierDto) {
    return this.classifierService.updateClassifier(dto);
  }

  @Delete(':id')
  deleteClassifier(@Param('id') id: number) {
    return this.classifierService.deleteClassifier(id);
  }
}
