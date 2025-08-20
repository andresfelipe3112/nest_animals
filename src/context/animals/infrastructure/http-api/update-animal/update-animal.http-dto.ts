import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class UpdateAnimalHttpDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;
}
