import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsString, ValidateNested } from 'class-validator';
import { Column } from 'src/column/column.entity';

export class BoardUpdateDto {
  @IsString()
  title: string;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Column)
  columns: Column[];
}
