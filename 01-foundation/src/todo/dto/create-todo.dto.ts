import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsBoolean()
  @IsNotEmpty()
  done: boolean = false;
}
