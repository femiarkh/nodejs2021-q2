import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  userId: string | null;

  columnId: string | null;

  boardId: string | null;
}
