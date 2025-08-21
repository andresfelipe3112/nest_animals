import { Cat } from "src/context/animals/domain/entities/cat.entity";
import { AnimalType } from "src/context/animals/domain/value-objects/animal-type.vo";

describe('Cat Entity', () => {
  it('should emit sound "Meow! Meow!"', () => {
    const cat = new Cat('1', 'Misu', 2, 'Black', true);
    expect(cat.emitSound()).toBe('Meow! Meow!');
  });

  it('should return attributes (color & isIndoor)', () => {
    const cat = new Cat('1', 'Misu', 2, 'Black', true);
    expect(cat.getAttributes()).toEqual({
      color: 'Black',
      isIndoor: true,
    });
  });

  it('should return type as CAT', () => {
    const cat = new Cat('1', 'Garfield', 5, 'Orange', false);
    expect(cat.getType()).toBe(AnimalType.CAT);
  });

  it('should expose color and isIndoor via getters', () => {
    const cat = new Cat('1', 'Luna', 4, 'Gray', false);
    expect(cat.getColor()).toBe('Gray');
    expect(cat.getIsIndoor()).toBe(false);
  });
});
