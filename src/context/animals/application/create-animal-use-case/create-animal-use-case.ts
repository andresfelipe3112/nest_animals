import { Inject, Injectable } from '@nestjs/common';
import { Animal, AnimalPrimitive } from '../../domain/entities/animal.entity';
import { AnimalRepository } from '../../domain/repositories/animal.repository';
import { IAnimalFactory } from '../../infrastructure/factories/interfaces/animal-factory.interface';
import { CreateAnimalDto } from './create-animal.dto';
import { AnimalCreationData } from '../../shared/types/animal-creation-data';
import { UnsupportedAnimalTypeException } from '../../shared/exceptions/unsupported-animal-type.exception';

@Injectable()
export class CreateAnimalUseCase {
  constructor(
    @Inject('IAnimalFactory')
    private readonly animalFactory: IAnimalFactory,
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
  ) {}

  async execute(dto: CreateAnimalDto): Promise<{ animal: AnimalPrimitive }> {
    if (!this.animalFactory.isTypeSupported(dto.type)) {
      throw new UnsupportedAnimalTypeException(
        `Animal type '${dto.type}' is not supported`,
      );
    }

    const animalData: AnimalCreationData = {
      name: dto.name,
      age: dto.age,
      type: dto.type,
      specificAttributes: dto.attributes,
    };

    const animal = this.animalFactory.createAnimal(animalData);
    const savedAnimal = await this.animalRepository.create(animal);

    return {
      animal: {
        id: savedAnimal.getId(),
        name: savedAnimal.getName(),
        age: savedAnimal.getAge(),
        type: savedAnimal.getType(),
        sound: savedAnimal.emitSound(),
        attributes: savedAnimal.getAttributes(),
      },
    };
  }
}
