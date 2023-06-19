import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString({ message: 'Invalid DATABASE_HOST' })
  DATABASE_HOST: string;
  @IsString({ message: 'Invalid DATABASE_NAME' })
  DATABASE_NAME: string;
  @IsString({ message: 'Invalid DATABASE_USER' })
  DATABASE_USER: string;
  @IsString({ message: 'Invalid DATABASE_PASSWORD' })
  DATABASE_PASSWORD: string;
  @IsNumber()
  DATABASE_PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  // `plainToClass` to converts plain object into Class
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // `validateSync` method validate the class and returns errors
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
