import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ColumnCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
