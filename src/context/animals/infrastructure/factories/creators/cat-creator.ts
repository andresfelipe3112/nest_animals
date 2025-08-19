import { Injectable } from '@nestjs/common';
import { IAnimalCreator } from '../interfaces/animal-creator.interface';
import { Animal } from '../../../domain/entities/animal.entity';
import { AnimalType } from '../../../domain/value-objects/animal-type.vo';
import {
  AnimalCreationData,
  CatAttributes,
} from '../../../shared/types/animal-creation-data';
import { Cat } from '../../../domain/entities/cat.entity';

@Injectable()
export class CatCreator implements IAnimalCreator {
  create(data: AnimalCreationData): Animal {
    const attributes = data.specificAttributes as CatAttributes;

    if (!attributes.color || typeof attributes.isIndoor !== 'boolean') {
      throw new Error('Cat requires color and isIndoor attributes');
    }

    return new Cat(
      data.id,
      data.name,
      data.age,
      attributes.color,
      attributes.isIndoor,
    );
  }

  getType(): AnimalType {
    return AnimalType.CAT;
  }
}
