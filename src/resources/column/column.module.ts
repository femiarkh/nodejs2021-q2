import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
