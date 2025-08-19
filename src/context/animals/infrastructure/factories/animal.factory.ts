import { Injectable } from '@nestjs/common';
import { IAnimalFactory } from './interfaces/animal-factory.interface';
import { IAnimalCreator } from './interfaces/animal-creator.interface';
import { Animal } from '../../domain/entities/animal.entity';
import { AnimalType } from '../../domain/value-objects/animal-type.vo';
import { AnimalCreationData } from '../../shared/types/animal-creation-data';
import { UnsupportedAnimalTypeException } from '../../shared/exceptions/unsupported-animal-type.exception';
import { AnimalCreationException } from '../../shared/exceptions/animal-creation.exception';
import { DogCreator } from './creators/dog-creator';
import { CatCreator } from './creators/cat-creator';
import { CowCreator } from './creators/cow-creator';

@Injectable()
export class AnimalFactory implements IAnimalFactory {
  private readonly creators = new Map<AnimalType, IAnimalCreator>();

  constructor(
    private readonly dogCreator: DogCreator,
    private readonly catCreator: CatCreator,
    private readonly cowCreator: CowCreator,
  ) {
    this.registerCreators();
  }

  private registerCreators(): void {
    const creators = [this.dogCreator, this.catCreator, this.cowCreator];

    creators.forEach((creator) => {
      this.creators.set(creator.getType(), creator);
    });
  }

  createAnimal(data: AnimalCreationData): Animal {
    const creator = this.creators.get(data.type);

    if (!creator) {
      throw new UnsupportedAnimalTypeException(
        `Animal type '${data.type}' is not supported. ` +
          `Supported types: ${this.getSupportedTypes().join(', ')}`,
      );
    }

    try {
      return creator.create(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new AnimalCreationException(
        `Failed to create ${data.type}: ${errorMessage}`,
      );
    }
  }

  getSupportedTypes(): AnimalType[] {
    return Array.from(this.creators.keys());
  }

  isTypeSupported(type: AnimalType): boolean {
    return this.creators.has(type);
  }

  registerCreator(creator: IAnimalCreator): void {
    this.creators.set(creator.getType(), creator);
  }
}
