import { AnimalType } from '../../domain/value-objects/animal-type.vo';

export interface AnimalCreationData {
  id?: string;
  name: string;
  age: number;
  type: AnimalType;
  specificAttributes: Record<string, any>;
}

export interface DogAttributes {
  breed: string;
  isGoodBoy?: boolean;
}

export interface CatAttributes {
  color: string;
  isIndoor: boolean;
}

export interface CowAttributes {
  weight: number;
  milkProduction: number;
}
