import { Injectable } from '@nestjs/common';
import { IAnimalCreator } from '../interfaces/animal-creator.interface';
import { Animal } from '../../../domain/entities/animal.entity';
import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import {
  AnimalCreationData,
  DogAttributes,
} from '../../../shared/types/animal-creation-data';
import { Dog } from '../../../domain/entities/dog.entity';

@Injectable()
export class DogCreator implements IAnimalCreator {
  create(data: AnimalCreationData): Animal {
    const attributes = data.specificAttributes as DogAttributes;

    if (!attributes.breed) {
      throw new Error('Dog requires breed attribute');
    }

    return new Dog(
      data.id,
      data.name,
      data.age,
      attributes.breed,
      attributes.isGoodBoy ?? true,
    );
  }

  getType(): AnimalType {
    return AnimalType.DOG;
  }
}
