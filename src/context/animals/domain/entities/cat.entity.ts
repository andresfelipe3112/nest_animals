import { Animal } from './animal.entity';
import { AnimalType } from '../value-objects/animal-type.vo';

export class Cat extends Animal {
  constructor(
    id: string | undefined,
    name: string,
    age: number,
    private color: string,
    private isIndoor: boolean,
  ) {
    super(id, name, age);
  }

  emitSound(): string {
    return 'Meow! Meow!';
  }

  getAttributes(): Record<string, any> {
    return {
      id: this.getId(),
      name: this.getName(),
      age: this.getAge(),
      type: this.getType(),
      color: this.color,
      isIndoor: this.isIndoor,
    };
  }

  getType(): AnimalType {
    return AnimalType.CAT;
  }

  getColor(): string {
    return this.color;
  }

  getIsIndoor(): boolean {
    return this.isIndoor;
  }
}
