
import { IAnimalFactory } from "src/context/animals/infrastructure/factories/interfaces/animal-factory.interface";
import { AnimalRepository } from "src/context/animals/domain/repositories/animal.repository";
import { UnsupportedAnimalTypeException } from "src/context/animals/shared/exceptions/unsupported-animal-type.exception";
import { CreateAnimalUseCase } from "src/context/animals/application/create-animal-use-case/create-animal-use-case";
import { CreateAnimalDto } from "src/context/animals/application/create-animal-use-case/create-animal.dto";
import { Dog } from "src/context/animals/domain/entities/dog.entity";
import { AnimalType } from "src/context/animals/domain/value-objects/animal-type.vo";


describe("CreateAnimalUseCase", () => {
  let useCase: CreateAnimalUseCase;
  let factory: jest.Mocked<IAnimalFactory>;
  let repository: jest.Mocked<AnimalRepository>;

  beforeEach(() => {
    factory = {
      isTypeSupported: jest.fn(),
      createAnimal: jest.fn(),
    } as any;

    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateAnimalUseCase(factory, repository);
  });

  it("should throw UnsupportedAnimalTypeException if type is not supported", async () => {
    factory.isTypeSupported.mockReturnValue(false);

    const dto: CreateAnimalDto = {
      name: "Unknown",
      age: 3,
      type: "dragon" as any,
      attributes: {},
    };

    await expect(useCase.execute(dto)).rejects.toThrow(
      UnsupportedAnimalTypeException
    );
  });

  it("should create and return an animal if type is supported", async () => {
    factory.isTypeSupported.mockReturnValue(true);

    const dto: CreateAnimalDto = {
      name: "Firulais",
      age: 3,
      type: AnimalType.DOG,
      attributes: { breed: "Golden Retriever", isGoodBoy: true },
    };

    const mockAnimal = new Dog(
      "123",
      "Firulais",
      3,
      dto.attributes.breed,
      dto.attributes.isGoodBoy
    );

    factory.createAnimal.mockReturnValue(mockAnimal as any);
    repository.create.mockResolvedValue(mockAnimal as any);

    const result = await useCase.execute(dto);

    expect(factory.isTypeSupported).toHaveBeenCalledWith("dog");
    expect(factory.createAnimal).toHaveBeenCalledWith({
      name: "Firulais",
      age: 3,
      type: "dog",
      specificAttributes: dto.attributes,
    });
    expect(repository.create).toHaveBeenCalledWith(mockAnimal);

    expect(result).toEqual({
      animal: {
        id: "123",
        name: "Firulais",
        age: 3,
        type: "dog",
        sound: "Woof! Woof!",
        attributes: dto.attributes,
      },
    });
  });
});
