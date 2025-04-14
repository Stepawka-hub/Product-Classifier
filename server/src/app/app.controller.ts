import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IAppData } from './types/app-data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('fill-data')
  async fillData(): Promise<IAppData> {
    return await this.appService.fillData();
  }
}
