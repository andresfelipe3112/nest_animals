import { Inject, Injectable } from '@nestjs/common';
import { AnimalPrimitive } from '../../domain/entities/animal.entity';
import { AnimalRepository } from '../../domain/repositories/animal.repository';
import { AnimalType } from '../../domain/value-objects/animal-type.vo';
import { UpdateAnimalDto } from './update-animal.dto';
import { AnimalNotFoundException } from '../../shared/exceptions/animal-not-found.exception';

@Injectable()
export class UpdateAnimalUseCase {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateAnimalDto,
  ): Promise<{ animal: AnimalPrimitive }> {
    // Verificar que el animal existe antes de actualizar
    const existingAnimal = await this.animalRepository.findById(id);

    if (!existingAnimal) {
      throw new AnimalNotFoundException(`Animal with ID '${id}' not found`);
    }

    // Como el repository update acepta un Partial<Animal>, necesitamos
    // pasar solo los campos que queremos actualizar sin crear una entidad completa
    const updateData: any = {};

    if (dto.name !== undefined) {
      updateData.name = dto.name;
    }

    if (dto.age !== undefined) {
      updateData.age = dto.age;
    }

    if (dto.attributes !== undefined) {
      // Validar que los atributos sean compatibles con el tipo de animal existente
      this.validateAttributesForType(dto.attributes, existingAnimal.getType());
      updateData.attributes = dto.attributes;
    }

    const updatedAnimal = await this.animalRepository.update(id, updateData);

    return {
      animal: {
        id: updatedAnimal.getId(),
        name: updatedAnimal.getName(),
        age: updatedAnimal.getAge(),
        type: updatedAnimal.getType(),
        sound: updatedAnimal.emitSound(),
        attributes: updatedAnimal.getAttributes(),
      },
    };
  }

  private validateAttributesForType(
    attributes: Record<string, any>,
    type: AnimalType,
  ): void {
    switch (type) {
      case AnimalType.DOG:
        this.validateDogAttributes(attributes);
        break;
      case AnimalType.CAT:
        this.validateCatAttributes(attributes);
        break;
      case AnimalType.COW:
        this.validateCowAttributes(attributes);
        break;
      default:
        throw new Error(`Unsupported animal type: ${type}`);
    }
  }

  private validateDogAttributes(attributes: Record<string, any>): void {
    if (
      attributes.breed !== undefined &&
      (typeof attributes.breed !== 'string' || attributes.breed.trim() === '')
    ) {
      throw new Error('Dog breed must be a non-empty string');
    }
    if (
      attributes.isGoodBoy !== undefined &&
      typeof attributes.isGoodBoy !== 'boolean'
    ) {
      throw new Error('Dog isGoodBoy must be a boolean');
    }
  }

  private validateCatAttributes(attributes: Record<string, any>): void {
    if (
      attributes.color !== undefined &&
      (typeof attributes.color !== 'string' || attributes.color.trim() === '')
    ) {
      throw new Error('Cat color must be a non-empty string');
    }
    if (
      attributes.isIndoor !== undefined &&
      typeof attributes.isIndoor !== 'boolean'
    ) {
      throw new Error('Cat isIndoor must be a boolean');
    }
  }

  private validateCowAttributes(attributes: Record<string, any>): void {
    if (
      attributes.weight !== undefined &&
      (typeof attributes.weight !== 'number' || attributes.weight <= 0)
    ) {
      throw new Error('Cow weight must be a positive number');
    }
    if (
      attributes.milkProduction !== undefined &&
      (typeof attributes.milkProduction !== 'number' ||
        attributes.milkProduction < 0)
    ) {
      throw new Error('Cow milkProduction must be a non-negative number');
    }
  }
}
