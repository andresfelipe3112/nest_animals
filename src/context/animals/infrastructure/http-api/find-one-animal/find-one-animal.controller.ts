import { Controller, Get, Param } from '@nestjs/common';
import { FindOneAnimalUseCase } from '../../../application/find-one-animal-use-case/find-one-animal-use-case';
import { Animal, AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getCreateAnimalSwaggerResponse } from 'src/context/animals/shared/utils/swagger.utils';

@ApiTags('find-one-Animal') 
@ApiExtraModels(Animal)
@Controller(V1_ANIMALS)
export class FindOneAnimalController {
  constructor(private readonly findOneAnimalUseCase: FindOneAnimalUseCase) {}

  @Get(':id')
  @ApiResponse(getCreateAnimalSwaggerResponse())
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 422, description: 'El tipo de animal no es compatible.' })
  async run(@Param('id') id: string): Promise<{ animal: AnimalPrimitive }> {
    return await this.findOneAnimalUseCase.execute({ id });
  }
}
