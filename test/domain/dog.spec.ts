import { Dog } from "src/context/animals/domain/entities/dog.entity";

describe('Dog Entity', () => {
  it('should emit sound Woof! Woof!', () => {
    const dog = new Dog('1', 'Firulais', 3, 'Golden Retriever');
    expect(dog.emitSound()).toBe('Woof! Woof!');
  });

  it('should return attributes (breed & isGoodBoy)', () => {
    const dog = new Dog('1', 'Firulais', 3, 'Golden Retriever', false);
    expect(dog.getAttributes()).toEqual({
      breed: 'Golden Retriever',
      isGoodBoy: false,
    });
  });

  it('should return default isGoodBoy=true if not provided', () => {
    const dog = new Dog('1', 'Max', 2, 'Beagle');
    expect(dog.getIsGoodBoy()).toBe(true);
  });

  it('should return type as DOG', () => {
    const dog = new Dog('1', 'Rocky', 4, 'Bulldog');
    expect(dog.getType()).toBe('dog');
  });

  it('should expose breed and isGoodBoy via getters', () => {
    const dog = new Dog('1', 'Lassie', 6, 'Collie', true);
    expect(dog.getBreed()).toBe('Collie');
    expect(dog.getIsGoodBoy()).toBe(true);
  });
});
