// src/shared/utils/swagger.utils.ts
import { getSchemaPath } from '@nestjs/swagger';
import { Animal } from '../../domain/entities/animal.entity';


export const getCreateAnimalSwaggerBody = () => ({
  description: 'Datos para crear un nuevo animal',
  examples: {
    dog: {
      summary: 'Ejemplo de un perro',
      value: {
        name: 'Fido',
        age: 5,
        type: 'dog',
        attributes: {
          breed: 'Golden Retriever',
        },
      },
    },
    cat: {
      summary: 'Ejemplo de un gato',
      value: {
        name: 'Whiskers',
        age: 3,
        type: 'cat',
        attributes: {
          favorite_toy: 'Yarn ball',
        },
      },
    },
    cow: {
      summary: 'Ejemplo de una vaca',
      value: {
        name: 'Bessie',
        age: 4,
        type: 'cow',
        attributes: {
          weight: 500,
          milk_production: 20,
        },
      },
    },
  },
});

export const getCreateAnimalSwaggerResponse = () => ({
  status: 201,
  description: 'El animal ha sido creado exitosamente.',
  schema: {
    $ref: getSchemaPath(Animal),
    properties: {
      id: { type: 'string', example: '60c72b2f9b1d8e001f8e1234' },
      name: { type: 'string', example: 'Fido' },
      age: { type: 'number', example: 5 },
      type: { type: 'string', enum: ['dog', 'cat', 'cow'], example: 'dog' },
      attributes: {
        type: 'object',
        example: {
          breed: 'Golden Retriever',
          favorite_toy: 'Ball',
        },
      },
    },
  },
});