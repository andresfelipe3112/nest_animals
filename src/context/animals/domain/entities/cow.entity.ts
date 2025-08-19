import { Animal } from './animal.entity';
import { AnimalType } from '../value-objects/animal-type.vo';

export class Cow extends Animal {
  constructor(
    id: string | undefined,
    name: string,
    age: number,
    private weight: number,
    private milkProduction: number,
  ) {
    super(id, name, age);
  }

  emitSound(): string {
    return 'Moo! Moo!';
  }

  getAttributes(): Record<string, any> {
    return {
      id: this.getId(),
      name: this.getName(),
      age: this.getAge(),
      type: this.getType(),
      weight: this.weight,
      milkProduction: this.milkProduction,
    };
  }

  getType(): AnimalType {
    return AnimalType.COW;
  }

  getWeight(): number {
    return this.weight;
  }

  getMilkProduction(): number {
    return this.milkProduction;
  }
}
