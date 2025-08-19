import { Injectable } from '@nestjs/common';
import { IAnimalCreator } from '../interfaces/animal-creator.interface';
import { Animal } from '../../../domain/entities/animal.entity';
import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import {
  AnimalCreationData,
  CowAttributes,
} from '../../../shared/types/animal-creation-data';
import { Cow } from '../../../domain/entities/cow.entity';

@Injectable()
export class CowCreator implements IAnimalCreator {
  create(data: AnimalCreationData): Animal {
    const attributes = data.specificAttributes as CowAttributes;

    if (!attributes.weight || !attributes.milkProduction) {
      throw new Error('Cow requires weight and milkProduction attributes');
    }

    return new Cow(
      data.id,
      data.name,
      data.age,
      attributes.weight,
      attributes.milkProduction,
    );
  }

  getType(): AnimalType {
    return AnimalType.COW;
  }
}
