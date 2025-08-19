import { AnimalType } from '../value-objects/animal-type.vo';

export interface AnimalPrimitive {
  id: string;
  name: string;
  age: number;
  type: string;
}

export abstract class Animal {
  constructor(
    protected id: string | undefined,
    protected name: string,
    protected age: number,
  ) {}

  abstract emitSound(): string;
  abstract getAttributes(): Record<string, any>;
  abstract getType(): AnimalType;

  getId(): string | undefined {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
}
