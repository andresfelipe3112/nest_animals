import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateAnimalUseCase } from '../../../application/update-animal-use-case/update-animal-use-case';
import { Animal, AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';
import { UpdateAnimalHttpDto } from './update-animal.http-dto';
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { updateAnimalSwaggerBody, updateAnimalSwaggerResponse } from 'src/context/animals/shared/utils/swagger.utils';

@ApiTags('Edit Animals') 
@ApiExtraModels(Animal, UpdateAnimalHttpDto)
@Controller(V1_ANIMALS)
export class UpdateAnimalController {
  constructor(private readonly updateAnimalUseCase: UpdateAnimalUseCase) {}

  @Patch(':id')
  @ApiBody(updateAnimalSwaggerBody())
  @ApiResponse(updateAnimalSwaggerResponse())
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 422, description: 'El tipo de animal no es compatible.' })
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
