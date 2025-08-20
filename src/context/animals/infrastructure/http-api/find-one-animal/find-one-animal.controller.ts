import { Controller, Get, Param } from '@nestjs/common';
import { FindOneAnimalUseCase } from '../../../application/find-one-animal-use-case/find-one-animal-use-case';
import { AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';

@Controller(V1_ANIMALS)
export class FindOneAnimalController {
  constructor(private readonly findOneAnimalUseCase: FindOneAnimalUseCase) {}

  @Get(':id')
  async run(@Param('id') id: string): Promise<{ animal: AnimalPrimitive }> {
    return await this.findOneAnimalUseCase.execute({ id });
  }
}
