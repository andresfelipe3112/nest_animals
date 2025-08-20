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
export class AnimalDocument extends Document implements AnimalPrimitive {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: AnimalType })
  type: string; // Guardamos el tipo como string en la DB

  @Prop({ type: Object }) // Para atributos específicos, guardamos como un objeto flexible
  specificAttributes: Record<string, any>;

  // Métodos del dominio para la entidad Animal
  // Estos no se mapean directamente a la base de datos, son parte de la lógica de dominio
  // pero los incluimos para demostrar la hidratación
  emitSound(): string { return ''; } // Placeholder
  getAttributes(): Record<string, any> { return {}; } // Placeholder
  getType(): AnimalType { return AnimalType.DOG; } // Placeholder
}

export const AnimalSchema = SchemaFactory.createForClass(AnimalDocument);


@Injectable()
export class MongoAnimalRepository implements AnimalRepository {
  constructor(@InjectModel(AnimalDocument.name) private animalModel: Model<AnimalDocument>) {}

  async create(animal: Animal): Promise<Animal> {
    // Convertir la entidad de dominio a un objeto plano para guardar en la DB
    const createdAnimal = new this.animalModel({
      name: animal.getName(),
      age: animal.getAge(),
      type: animal.getType(),
      specificAttributes: animal.getAttributes(),
    });
    const savedDoc = await createdAnimal.save();
    // Rehidratar el documento de la DB a la entidad de dominio
    return this.mapDocumentToDomain(savedDoc);
  }

  async findById(id: string): Promise<Animal | null> {
    const animalDoc = await this.animalModel.findById(id).exec();
    return animalDoc ? this.mapDocumentToDomain(animalDoc) : null;
  }

  async findAll(type?: string, page: number = 1, limit: number = 10): Promise<Animal[]> {
    const query: any = {};
    if (type) {
      query.type = type;
    }
    const skip = (page - 1) * limit;
    const animalDocs = await this.animalModel.find(query).skip(skip).limit(limit).exec();
    return animalDocs.map(doc => this.mapDocumentToDomain(doc));
  }

  async update(id: string, animalPartial: Partial<Animal>): Promise<Animal> {
    const updateData: any = {
      name: animalPartial.getName ? animalPartial.getName() : undefined,
      age: animalPartial.getAge ? animalPartial.getAge() : undefined,
      type: animalPartial.getType ? animalPartial.getType() : undefined,
      specificAttributes: animalPartial.getAttributes ? animalPartial.getAttributes() : undefined,
    };
    // Limpiar propiedades undefined para que no sobrescriban valores existentes
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedDoc = await this.animalModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedDoc) {
      throw new Error(`Animal con ID ${id} no encontrado.`);
    }
    return this.mapDocumentToDomain(updatedDoc);
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
          doc.specificAttributes.color,
          doc.specificAttributes.isIndoor,
        );
      case AnimalType.DOG:
        return new Dog(
          commonProps.id,
          commonProps.name,
          commonProps.age,
          doc.specificAttributes.breed,
          doc.specificAttributes.isGoodBoy,
        );
      case AnimalType.COW:
        return new Cow(
          commonProps.id,
          commonProps.name,
          commonProps.age,
          doc.specificAttributes.weight,
          doc.specificAttributes.milkProduction,
        );
      default:
        throw new Error(`Tipo de animal desconocido: ${doc.type}`);
    }
  }
}