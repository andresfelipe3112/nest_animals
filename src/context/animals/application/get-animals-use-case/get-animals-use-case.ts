import { Inject, Injectable } from '@nestjs/common';
import { AnimalPrimitive } from '../../domain/entities/animal.entity';
import { AnimalRepository } from '../../domain/repositories/animal.repository';
import { GetAnimalsDto } from './get-animals.dto';

@Injectable()
export class GetAnimalsUseCase {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
  ) {}

  async execute(dto: GetAnimalsDto): Promise<{
    animals: AnimalPrimitive[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const page = dto.page || 1;
    const limit = dto.limit || 10;
    const type = dto.type;

    // Ejecutar ambas consultas en paralelo para mejor performance
    const [animals, total] = await Promise.all([
      this.animalRepository.findAll(type, page, limit),
      this.animalRepository.count(type),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      animals: animals.map((animal) => ({
        id: animal.getId(),
        name: animal.getName(),
        age: animal.getAge(),
        type: animal.getType(),
        sound: animal.emitSound(),
        attributes: animal.getAttributes(),
      })),
      total, // Total real de documentos en la BD
      page,
      pageSize: limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
}
