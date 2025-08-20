import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AnimalDocument,
  AnimalSchema,
  MongoAnimalRepository,
} from './context/animals/infrastructure/repositories/mongo-animal.repository';
import { AnimalFactory } from './context/animals/infrastructure/factories/animal.factory';
import { CatCreator } from './context/animals/infrastructure/factories/creators/cat-creator';
import { DogCreator } from './context/animals/infrastructure/factories/creators/dog-creator';
import { CowCreator } from './context/animals/infrastructure/factories/creators/cow-creator';
import { CreateAnimalUseCase } from './context/animals/application/create-animal-use-case/create-animal-use-case';
import { GetAnimalsUseCase } from './context/animals/application/get-animals-use-case/get-animals-use-case';
import { FindOneAnimalUseCase } from './context/animals/application/find-one-animal-use-case/find-one-animal-use-case';
import { UpdateAnimalUseCase } from './context/animals/application/update-animal-use-case/update-animal-use-case';
import { DeleteAnimalUseCase } from './context/animals/application/delete-animal-use-case/delete-animal-use-case';

// HTTP Controllers
import { CreateAnimalController } from './context/animals/infrastructure/http-api/create-animal/create-animal.controller';
import { GetAnimalsController } from './context/animals/infrastructure/http-api/get-animals/get-animals.controller';
import { FindOneAnimalController } from './context/animals/infrastructure/http-api/find-one-animal/find-one-animal.controller';
import { UpdateAnimalController } from './context/animals/infrastructure/http-api/update-animal/update-animal.controller';
import { DeleteAnimalController } from './context/animals/infrastructure/http-api/delete-animal/delete-animal.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/animals_db',
    ),
    MongooseModule.forFeature([
      { name: AnimalDocument.name, schema: AnimalSchema },
    ]),
  ],
  controllers: [
    CreateAnimalController,
    GetAnimalsController,
    FindOneAnimalController,
    UpdateAnimalController,
    DeleteAnimalController,
  ],
  providers: [
    CreateAnimalUseCase,
    GetAnimalsUseCase,
    FindOneAnimalUseCase,
    UpdateAnimalUseCase,
    DeleteAnimalUseCase,
    {
      provide: 'IAnimalFactory',
      useClass: AnimalFactory,
    },
    CatCreator,
    DogCreator,
    CowCreator,
    {
      provide: 'AnimalRepository',
      useClass: MongoAnimalRepository,
    },
  ],
})
export class AppModule {}
