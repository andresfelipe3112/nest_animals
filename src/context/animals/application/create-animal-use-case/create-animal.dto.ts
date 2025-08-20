import { AnimalType } from '../../domain/value-objects/animal-type.vo';

export interface CreateAnimalDto {
  name: string;
  age: number;
  type: AnimalType;
  attributes: Record<string, any>;
}
