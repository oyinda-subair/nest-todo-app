import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  public isDeleted?: boolean;
}
