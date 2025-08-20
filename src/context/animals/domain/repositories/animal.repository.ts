import { Animal } from '../entities/animal.entity';

export interface AnimalRepository {
  create(animal: Animal): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  findAll(type?: string, page?: number, limit?: number): Promise<Animal[]>;
  count(type?: string): Promise<number>;
  update(id: string, animal: Partial<Animal>): Promise<Animal>;
  delete(id: string): Promise<void>;
}
