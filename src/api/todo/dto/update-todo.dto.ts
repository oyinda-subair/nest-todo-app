import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public description?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  public isDone?: boolean;
}
