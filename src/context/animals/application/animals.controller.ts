import { Controller, Post, Body, Get, Param, Query, HttpCode, HttpStatus, Patch, Delete, HttpException } from '@nestjs/common';
import { CreateAnimalUseCase } from '../application/create-animal-use-case/create-animal-use-case';
import { CreateAnimalDto } from '../application/create-animal-use-case/create-animal.dto';
// import { FindAllAnimalsUseCase } from '../application/find-all-animals-use-case/find-all-animals-use-case';
// import { FindOneAnimalUseCase } from '../application/find-one-animal-use-case/find-one-animal-use-case';
// import { UpdateAnimalUseCase } from '../application/update-animal-use-case/update-animal-use-case';
// import { UpdateAnimalDto } from '../application/update-animal-use-case/update-animal.dto'; // Asumiendo que tienes este DTO
// import { DeleteAnimalUseCase } from '../application/delete-animal-use-case/delete-animal-use-case';
import { Animal } from '../domain/entities/animal.entity';
import { UnsupportedAnimalTypeException } from '../shared/exceptions/unsupported-animal-type.exception';
import { ApiTags, ApiResponse, getSchemaPath, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { getCreateAnimalSwaggerBody, getCreateAnimalSwaggerResponse } from '../shared/utils/swagger.utils';

@ApiTags('Animals') // Etiqueta para la documentación de Swagger
@ApiExtraModels(Animal, CreateAnimalDto)
@Controller('animals')
export class AnimalsController {
    constructor(
        private readonly createAnimalUseCase: CreateAnimalUseCase,
        // private readonly findAllAnimalsUseCase: FindAllAnimalsUseCase,
        // private readonly findOneAnimalUseCase: FindOneAnimalUseCase,
        // private readonly updateAnimalUseCase: UpdateAnimalUseCase,
        // private readonly deleteAnimalUseCase: DeleteAnimalUseCase,
    ) { }

    @Post()
    @ApiBody(getCreateAnimalSwaggerBody())
    @ApiResponse(getCreateAnimalSwaggerResponse())
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    @ApiResponse({ status: 422, description: 'El tipo de animal no es compatible.' })
    async create(@Body() dto: CreateAnimalDto): Promise<Animal> {
        try {
            return await this.createAnimalUseCase.execute(dto);
        } catch (error) {
            if (error instanceof UnsupportedAnimalTypeException) {
                throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            throw error;
        }
    }

    //   @Get()
    //   @ApiResponse({ status: 200, description: 'List of animals successfully retrieved.' })
    //   async findAll(@Query('type') type?: string, @Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Animal[]> {
    //     return await this.findAllAnimalsUseCase.execute(type, page, limit);
    //   }

    //   @Get(':id')
    //   @ApiResponse({ status: 200, description: 'Animal successfully retrieved.' })
    //   @ApiResponse({ status: 404, description: 'Animal not found.' })
    //   async findOne(@Param('id') id: string): Promise<Animal> {
    //     const animal = await this.findOneAnimalUseCase.execute(id);
    //     if (!animal) {
    //       throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);
    //     }
    //     return animal;
    //   }

    //   @Patch(':id')
    //   @ApiResponse({ status: 200, description: 'Animal successfully updated.' })
    //   @ApiResponse({ status: 404, description: 'Animal not found.' })
    //   async update(@Param('id') id: string, @Body() dto: UpdateAnimalDto): Promise<Animal> {
    //     const updatedAnimal = await this.updateAnimalUseCase.execute(id, dto);
    //     if (!updatedAnimal) {
    //       throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);
    //     }
    //     return updatedAnimal;
    //   }

    //   @Delete(':id')
    //   @HttpCode(HttpStatus.NO_CONTENT)
    //   @ApiResponse({ status: 204, description: 'Animal successfully deleted.' })
    //   @ApiResponse({ status: 404, description: 'Animal not found.' })
    //   async delete(@Param('id') id: string): Promise<void> {
    //     await this.deleteAnimalUseCase.execute(id);
    //   }
}