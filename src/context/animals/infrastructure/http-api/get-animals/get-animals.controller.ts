import { Controller, Get, Query } from '@nestjs/common';
import { GetAnimalsUseCase } from '../../../application/get-animals-use-case/get-animals-use-case';
import { Animal, AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';
import { GetAnimalsHttpDto } from './get-animals.http-dto';
import { getAnimalSwaggerResponse } from 'src/context/animals/shared/utils/swagger.utils';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('find-Animals') 
@ApiExtraModels(Animal, GetAnimalsHttpDto)
@Controller(V1_ANIMALS)
export class GetAnimalsController {
  constructor(private readonly getAnimalsUseCase: GetAnimalsUseCase) {}

  @Get()
  @ApiResponse(getAnimalSwaggerResponse())
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 422, description: 'El tipo de animal no es compatible.' })
  async run(@Query() getAnimalsHttpDto: GetAnimalsHttpDto): Promise<{
    animals: AnimalPrimitive[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    return await this.getAnimalsUseCase.execute({
      type: getAnimalsHttpDto.type,
      page: getAnimalsHttpDto.page,
      limit: getAnimalsHttpDto.limit,
    });
  }
}
