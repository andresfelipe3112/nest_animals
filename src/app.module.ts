import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalDocument, AnimalSchema, MongoAnimalRepository } from './context/animals/infrastructure/repositories/mongo-animal.repository';
import { AnimalFactory } from './context/animals/infrastructure/factories/animal.factory';
import { CatCreator } from './context/animals/infrastructure/factories/creators/cat-creator';
import { DogCreator } from './context/animals/infrastructure/factories/creators/dog-creator';
import { CowCreator } from './context/animals/infrastructure/factories/creators/cow-creator';
import { CreateAnimalUseCase } from './context/animals/application/create-animal-use-case/create-animal-use-case';
import { AnimalsController } from './context/animals/application/animals.controller';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/animals_db'),
    MongooseModule.forFeature([{ name: AnimalDocument.name, schema: AnimalSchema }]),
  ],
  controllers: [
    AnimalsController
  ],
  providers: [
    CreateAnimalUseCase,
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