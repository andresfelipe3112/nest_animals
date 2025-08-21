import { AnimalRepository } from "src/context/animals/domain/repositories/animal.repository";
import { AnimalNotFoundException } from "src/context/animals/shared/exceptions/animal-not-found.exception";
import { AnimalType } from "src/context/animals/domain/value-objects/animal-type.vo";
import { UpdateAnimalUseCase } from "src/context/animals/application/update-animal-use-case/update-animal-use-case";

describe("UpdateAnimalUseCase", () => {
  let useCase: UpdateAnimalUseCase;
  let repository: jest.Mocked<AnimalRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new UpdateAnimalUseCase(repository);
  });

  it("should throw AnimalNotFoundException if animal does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute("123", { name: "Nuevo Nombre" })
    ).rejects.toThrow(AnimalNotFoundException);

    expect(repository.findById).toHaveBeenCalledWith("123");
    expect(repository.update).not.toHaveBeenCalled();
  });

  it("should update and return animal if valid data is provided", async () => {
    const mockAnimal = {
      getId: () => "123",
      getName: () => "Firulais",
      getAge: () => 3,
      getType: () => AnimalType.DOG,
      emitSound: () => "Woof! Woof!",
      getAttributes: () => ({ breed: "Beagle", isGoodBoy: true }),
    };

    repository.findById.mockResolvedValue(mockAnimal as any);
    repository.update.mockResolvedValue({
      ...mockAnimal,
      getName: () => "Rocky",
      getAge: () => 5,
      getAttributes: () => ({ breed: "Bulldog", isGoodBoy: false }),
    } as any);

    const result = await useCase.execute("123", {
      name: "Rocky",
      age: 5,
      attributes: { breed: "Bulldog", isGoodBoy: false },
    });

    expect(repository.findById).toHaveBeenCalledWith("123");
    expect(repository.update).toHaveBeenCalledWith("123", {
      name: "Rocky",
      age: 5,
      attributes: { breed: "Bulldog", isGoodBoy: false },
    });

    expect(result).toEqual({
      animal: {
        id: "123",
        name: "Rocky",
        age: 5,
        type: AnimalType.DOG,
        sound: "Woof! Woof!",
        attributes: { breed: "Bulldog", isGoodBoy: false },
      },
    });
  });

  it("should throw error if invalid dog attributes are provided", async () => {
    const mockAnimal = { getType: () => AnimalType.DOG };
    repository.findById.mockResolvedValue(mockAnimal as any);

    await expect(
      useCase.execute("123", {
        attributes: { breed: "", isGoodBoy: "yes" as any },
      })
    ).rejects.toThrow();
  });

  it("should throw error if invalid cat attributes are provided", async () => {
    const mockAnimal = { getType: () => AnimalType.CAT };
    repository.findById.mockResolvedValue(mockAnimal as any);

    await expect(
      useCase.execute("123", {
        attributes: { color: "", isIndoor: "true" as any },
      })
    ).rejects.toThrow();
  });

  it("should throw error if invalid cow attributes are provided", async () => {
    const mockAnimal = { getType: () => AnimalType.COW };
    repository.findById.mockResolvedValue(mockAnimal as any);

    await expect(
      useCase.execute("123", {
        attributes: { weight: -10, milkProduction: -1 },
      })
    ).rejects.toThrow();
  });
});
