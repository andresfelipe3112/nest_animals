import { Animal } from '../../../domain/entities/animal.entity';
import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import { AnimalCreationData } from '../../../shared/types/animal-creation-data';

export interface IAnimalCreator {
  create(data: AnimalCreationData): Animal;
  getType(): AnimalType;
}
