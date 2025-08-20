import {
  Controller,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DeleteAnimalUseCase } from '../../../application/delete-animal-use-case/delete-animal-use-case';
import { V1_ANIMALS } from '../route.constants';

@Controller(V1_ANIMALS)
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
