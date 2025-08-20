import { AnimalType } from '../../domain/value-objects/animal-type.vo';
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsObject } from 'class-validator';

export class CreateAnimalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(AnimalType)
  type: AnimalType;

  @IsNotEmpty()
  @IsObject()
  attributes: Record<string, any>;
}