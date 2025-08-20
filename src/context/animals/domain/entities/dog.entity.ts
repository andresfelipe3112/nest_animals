import { Animal } from './animal.entity';
import { AnimalType } from '../value-objects/animal-type.vo';

export class Dog extends Animal {
  constructor(
    id: string | undefined,
    name: string,
    age: number,
    private breed: string,
    private isGoodBoy: boolean = true,
  ) {
    super(id, name, age);
  }

  emitSound(): string {
    return 'Woof! Woof!';
  }

  getAttributes(): Record<string, any> {
    return {
      breed: this.breed,
      isGoodBoy: this.isGoodBoy,
    };
  }

  getType(): AnimalType {
    return AnimalType.DOG;
  }

  getBreed(): string {
    return this.breed;
  }

  getIsGoodBoy(): boolean {
    return this.isGoodBoy;
  }
}
