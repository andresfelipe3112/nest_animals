import { Animal } from '../../../domain/entities/animal.entity';
import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import { AnimalCreationData } from '../../../shared/types/animal-creation-data';

export interface IAnimalFactory {
  createAnimal(data: AnimalCreationData): Animal;
  getSupportedTypes(): AnimalType[];
  isTypeSupported(type: AnimalType): boolean;
}
