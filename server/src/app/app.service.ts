import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponseDto } from 'src/common/dto/response.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async fillData(): Promise<BaseResponseDto> {
    try {
      await this.seedDatabase();
      return BaseResponseDto.Success();
    } catch {
      throw new HttpException(
        BaseResponseDto.Error('Database filling failed'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async clearData(): Promise<BaseResponseDto> {
    try {
      await this.clearDatabase();
      return BaseResponseDto.Success();
    } catch {
      throw new HttpException(
        BaseResponseDto.Error('Database clearing failed'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async seedDatabase() {
    await this.dataSource.query('CALL seed_database()');
  }

  private async clearDatabase() {
    await this.dataSource.query('CALL clear_database()');
  }
}
