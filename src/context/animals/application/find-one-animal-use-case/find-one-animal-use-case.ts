import { Inject, Injectable } from '@nestjs/common';
import { AnimalPrimitive } from '../../domain/entities/animal.entity';
import { AnimalRepository } from '../../domain/repositories/animal.repository';
import { FindOneAnimalDto } from './find-one-animal.dto';
import { AnimalNotFoundException } from '../../shared/exceptions/animal-not-found.exception';

@Injectable()
export class FindOneAnimalUseCase {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
  ) {}

  async execute(dto: FindOneAnimalDto): Promise<{ animal: AnimalPrimitive }> {
    const animal = await this.animalRepository.findById(dto.id);

    if (!animal) {
      throw new AnimalNotFoundException(`Animal with ID '${dto.id}' not found`);
    }

    return {
      animal: {
        id: animal.getId(),
        name: animal.getName(),
        age: animal.getAge(),
        type: animal.getType(),
        sound: animal.emitSound(),
        attributes: animal.getAttributes(),
      },
    };
  }
}
