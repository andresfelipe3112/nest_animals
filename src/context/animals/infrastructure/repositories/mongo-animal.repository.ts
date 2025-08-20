import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalRepository } from '../../domain/repositories/animal.repository';
import { Animal, AnimalPrimitive } from '../../domain/entities/animal.entity';
import { AnimalType } from '../../domain/value-objects/animal-type.vo';
import { Dog } from '../../domain/entities/dog.entity';
import { Cat } from '../../domain/entities/cat.entity';
import { Cow } from '../../domain/entities/cow.entity';

// Define un esquema de Mongoose para el animal (esto iría en su propio archivo, por ejemplo, animal.schema.ts)
// Para simplicidad, lo incluimos aquí
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'animals' }) // Define el nombre de la colección en MongoDB
export class AnimalDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: AnimalType })
  type: string; // Guardamos el tipo como string en la DB

  @Prop({ type: Object, required: true })
  attributes: Record<string, any>; // Atributos específicos de cada animal
}

export const AnimalSchema = SchemaFactory.createForClass(AnimalDocument);

@Injectable()
export class MongoAnimalRepository implements AnimalRepository {
  constructor(
    @InjectModel(AnimalDocument.name)
    private animalModel: Model<AnimalDocument>,
  ) {}

  async create(animal: Animal): Promise<Animal> {
    // Convertir la entidad de dominio a un objeto plano para guardar en la DB
    const createdAnimal = new this.animalModel({
      name: animal.getName(),
      age: animal.getAge(),
      type: animal.getType(),
      attributes: animal.getAttributes(),
    });
    const savedDoc = await createdAnimal.save();
    // Rehidratar el documento de la DB a la entidad de dominio
    return this.mapDocumentToDomain(savedDoc);
  }

  async findById(id: string): Promise<Animal | null> {
    const animalDoc = await this.animalModel.findById(id).exec();
    return animalDoc ? this.mapDocumentToDomain(animalDoc) : null;
  }

  async findAll(
    type?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Animal[]> {
    const query: any = {};
    if (type) {
      query.type = type;
    }
    const skip = (page - 1) * limit;
    const animalDocs = await this.animalModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    return animalDocs.map((doc) => this.mapDocumentToDomain(doc));
  }

  async update(id: string, updateData: any): Promise<Animal> {
    // Limpiar propiedades undefined para que no sobrescriban valores existentes
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    const updatedDoc = await this.animalModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedDoc) {
      throw new Error(`Animal con ID ${id} no encontrado.`);
    }
    return this.mapDocumentToDomain(updatedDoc);
  }

  async count(type?: string): Promise<number> {
    const query: any = {};
    if (type) {
      query.type = type;
    }
    return await this.animalModel.countDocuments(query).exec();
  }

  async delete(id: string): Promise<void> {
    await this.animalModel.findByIdAndDelete(id).exec();
  }

  // Método auxiliar para mapear el documento de Mongoose a tu entidad de dominio Animal
  private mapDocumentToDomain(doc: AnimalDocument): Animal {
    const commonProps = {
      id: (doc._id as string).toString(), // Mapear _id de MongoDB a id de dominio
      name: doc.name,
      age: doc.age,
    };

    switch (doc.type) {
      case AnimalType.CAT:
        return new Cat(
          commonProps.id,
          commonProps.name,
          commonProps.age,
          doc.attributes.color || '', // color del documento o por defecto
          doc.attributes.isIndoor ?? false, // isIndoor del documento o por defecto
        );
      case AnimalType.DOG:
        return new Dog(
          commonProps.id,
          commonProps.name,
          commonProps.age,
          doc.attributes.breed || '', // breed del documento o por defecto
          doc.attributes.isGoodBoy ?? true, // isGoodBoy del documento o por defecto
        );
      case AnimalType.COW:
        return new Cow(
          commonProps.id,
          commonProps.name,
          commonProps.age,
          doc.attributes.weight || 0, // weight del documento o por defecto
          doc.attributes.milkProduction || 0, // milkProduction del documento o por defecto
        );
      default:
        throw new Error(`Tipo de animal desconocido: ${doc.type}`);
    }
  }
}
