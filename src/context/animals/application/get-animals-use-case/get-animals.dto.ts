import { AnimalType } from '../../domain/value-objects/animal-type.vo';

export interface GetAnimalsDto {
  type?: AnimalType;
  page?: number;
  limit?: number;
}
