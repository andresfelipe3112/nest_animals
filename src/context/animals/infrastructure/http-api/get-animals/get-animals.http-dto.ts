import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import { IsOptional, IsEnum, IsNumber, IsPositive, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetAnimalsHttpDto {
  @IsOptional()
  @IsEnum(AnimalType)
  type?: AnimalType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
