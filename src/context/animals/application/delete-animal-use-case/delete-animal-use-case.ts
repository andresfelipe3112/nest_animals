import { Inject, Injectable } from '@nestjs/common';
import { AnimalRepository } from '../../domain/repositories/animal.repository';
import { DeleteAnimalDto } from './delete-animal.dto';
import { AnimalNotFoundException } from '../../shared/exceptions/animal-not-found.exception';

@Injectable()
export class DeleteAnimalUseCase {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
  ) {}

  async execute(
    dto: DeleteAnimalDto,
  ): Promise<{ success: boolean; message: string }> {
    // Verificar que el animal existe antes de eliminar
    const existingAnimal = await this.animalRepository.findById(dto.id);

    if (!existingAnimal) {
      throw new AnimalNotFoundException(`Animal with ID '${dto.id}' not found`);
    }

    await this.animalRepository.delete(dto.id);

    return {
      success: true,
      message: `Animal with ID '${dto.id}' has been deleted successfully`,
    };
  }
}
