import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateAnimalUseCase } from '../../../application/update-animal-use-case/update-animal-use-case';
import { AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';
import { UpdateAnimalHttpDto } from './update-animal.http-dto';

@Controller(V1_ANIMALS)
export class UpdateAnimalController {
  constructor(private readonly updateAnimalUseCase: UpdateAnimalUseCase) {}

  @Patch(':id')
  async run(
    @Param('id') id: string,
    @Body() updateAnimalHttpDto: UpdateAnimalHttpDto,
  ): Promise<{ animal: AnimalPrimitive }> {
    return await this.updateAnimalUseCase.execute(id, {
      name: updateAnimalHttpDto.name,
      age: updateAnimalHttpDto.age,
      attributes: updateAnimalHttpDto.attributes,
    });
  }
}
