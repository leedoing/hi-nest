import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString({ each: true })
  readonly todoList: string[];
}
