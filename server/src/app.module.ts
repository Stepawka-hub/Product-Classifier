import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UnitModule } from './unit/unit.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, UnitModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
