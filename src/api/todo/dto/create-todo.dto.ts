import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;
  @IsString()
  public description: string;
  @IsBoolean()
  public isDone: boolean;
}
