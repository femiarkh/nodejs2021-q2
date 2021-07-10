import { IsNumber, IsString } from 'class-validator';

export class TaskUpdateDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  description: string;

  userId: string;

  columnId: string;
}
