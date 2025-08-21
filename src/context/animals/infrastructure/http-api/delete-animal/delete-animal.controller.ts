import {
  Controller,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DeleteAnimalUseCase } from '../../../application/delete-animal-use-case/delete-animal-use-case';
import { V1_ANIMALS } from '../route.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Delete-Animals') 
@Controller(V1_ANIMALS)
@ApiResponse({ status: 400, description: 'Datos inválidos.' })
@ApiResponse({ status: 422, description: 'El tipo de animal no es compatible.' })
export class DeleteAnimalController {
  constructor(private readonly deleteAnimalUseCase: DeleteAnimalUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async run(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    return await this.deleteAnimalUseCase.execute({ id });
  }
}
