import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsObject,
} from 'class-validator';
import { IsValidAnimalAttributes } from '../validators/animal-attributes.validator';

export class CreateAnimalHttpDto {
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
  @IsValidAnimalAttributes()
  attributes: Record<string, any>;
}
