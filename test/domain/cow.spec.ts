import { Cow } from "src/context/animals/domain/entities/cow.entity";

describe('Cow Entity', () => {
  it('should emit sound Moo! Moo!', () => {
    const cow = new Cow('1', 'Lola', 5, 300, 20);
    expect(cow.emitSound()).toBe('Moo! Moo!');
  });

  it('should return attributes (weight & milkProduction)', () => {
    const cow = new Cow('1', 'Lola', 5, 300, 20);
    expect(cow.getAttributes()).toEqual({
      weight: 300,
      milkProduction: 20,
    });
  });

  it('should return type as COW', () => {
    const cow = new Cow('1', 'Margarita', 4, 250, 15);
    expect(cow.getType()).toBe('cow'); 
  });

  it('should expose weight and milkProduction via getters', () => {
    const cow = new Cow('1', 'Vaquita', 3, 280, 18);
    expect(cow.getWeight()).toBe(280);
    expect(cow.getMilkProduction()).toBe(18);
  });
});
