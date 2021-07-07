import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Column } from 'src/column/column.entity';

export class BoardCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Column)
  columns: Column[];
}
