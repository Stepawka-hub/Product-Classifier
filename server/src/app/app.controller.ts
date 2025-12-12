import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponseDto } from 'src/common/dto/response.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('fill-data')
  fillData(): Promise<BaseResponseDto> {
    return this.appService.fillData();
  }

  @Post('clear-data')
  clearData(): Promise<BaseResponseDto> {
    return this.appService.clearData();
  }
}
