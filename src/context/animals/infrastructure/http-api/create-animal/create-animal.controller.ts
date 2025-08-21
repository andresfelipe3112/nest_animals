import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnimalUseCase } from '../../../application/create-animal-use-case/create-animal-use-case';
import { CreateAnimalHttpDto } from './create-animal.http-dto';
import { Animal, AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getCreateAnimalSwaggerBody, getCreateAnimalSwaggerResponse } from 'src/context/animals/shared/utils/swagger.utils';


@ApiTags('Create-Animals') 
@ApiExtraModels(Animal, CreateAnimalHttpDto)
@Controller(V1_ANIMALS)
export class CreateAnimalController {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) { }

  @Post()
  @ApiBody(getCreateAnimalSwaggerBody())
  @ApiResponse(getCreateAnimalSwaggerResponse())
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 422, description: 'El tipo de animal no es compatible.' })
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
