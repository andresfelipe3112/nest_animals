import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnimalUseCase } from '../../../application/create-animal-use-case/create-animal-use-case';
import { CreateAnimalHttpDto } from './create-animal.http-dto';
import { AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';

@Controller(V1_ANIMALS)
export class CreateAnimalController {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) {}

  @Post()
  async run(
    @Body() createAnimalHttpDto: CreateAnimalHttpDto,
  ): Promise<{ animal: AnimalPrimitive }> {
    return await this.createAnimalUseCase.execute({
      name: createAnimalHttpDto.name,
      age: createAnimalHttpDto.age,
      type: createAnimalHttpDto.type,
      attributes: createAnimalHttpDto.attributes,
    });
  }
}
