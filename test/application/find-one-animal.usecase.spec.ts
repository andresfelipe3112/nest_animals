import { AnimalRepository } from "src/context/animals/domain/repositories/animal.repository";
import { FindOneAnimalDto } from "src/context/animals/application/find-one-animal-use-case/find-one-animal.dto";
import { AnimalNotFoundException } from "src/context/animals/shared/exceptions/animal-not-found.exception";
import { FindOneAnimalUseCase } from "src/context/animals/application/find-one-animal-use-case/find-one-animal-use-case";

describe("FindOneAnimalUseCase", () => {
  let useCase: FindOneAnimalUseCase;
  let repository: jest.Mocked<AnimalRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindOneAnimalUseCase(repository);
  });

  it("should throw AnimalNotFoundException if animal does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    const dto: FindOneAnimalDto = { id: "123" };

    await expect(useCase.execute(dto)).rejects.toThrow(AnimalNotFoundException);
    expect(repository.findById).toHaveBeenCalledWith("123");
  });

  it("should return animal data if animal exists", async () => {
    // mock mínimo de un animal que tenga los métodos esperados
    const mockAnimal = {
      getId: () => "123",
      getName: () => "Firulais",
      getAge: () => 3,
      getType: () => "dog",
      emitSound: () => "Woof! Woof!",
      getAttributes: () => ({ breed: "Golden Retriever", isGoodBoy: true }),
    };

    repository.findById.mockResolvedValue(mockAnimal as any);

    const dto: FindOneAnimalDto = { id: "123" };

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual({
      animal: {
        id: "123",
        name: "Firulais",
        age: 3,
        type: "dog",
        sound: "Woof! Woof!",
        attributes: { breed: "Golden Retriever", isGoodBoy: true },
      },
    });
  });
});
