import { Controller, Get, Query } from '@nestjs/common';
import { GetAnimalsUseCase } from '../../../application/get-animals-use-case/get-animals-use-case';
import { AnimalPrimitive } from '../../../domain/entities/animal.entity';
import { V1_ANIMALS } from '../route.constants';
import { GetAnimalsHttpDto } from './get-animals.http-dto';

@Controller(V1_ANIMALS)
export class GetAnimalsController {
  constructor(private readonly getAnimalsUseCase: GetAnimalsUseCase) {}

  @Get()
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
