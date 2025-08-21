import { AnimalRepository } from "src/context/animals/domain/repositories/animal.repository";
import { GetAnimalsDto } from "src/context/animals/application/get-animals-use-case/get-animals.dto";
import { GetAnimalsUseCase } from "src/context/animals/application/get-animals-use-case/get-animals-use-case";
import { AnimalType } from "src/context/animals/domain/value-objects/animal-type.vo";

describe("GetAnimalsUseCase", () => {
  let useCase: GetAnimalsUseCase;
  let repository: jest.Mocked<AnimalRepository>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      count: jest.fn(),
    } as any;

    useCase = new GetAnimalsUseCase(repository);
  });

  it("should return paginated animals with metadata", async () => {
    const dto: GetAnimalsDto = { type: AnimalType.DOG, page: 1, limit: 2 };

    const mockAnimals = [
      {
        getId: () => "1",
        getName: () => "Firulais",
        getAge: () => 3,
        getType: () => "dog",
        emitSound: () => "Woof! Woof!",
        getAttributes: () => ({ breed: "Labrador", isGoodBoy: true }),
      },
      {
        getId: () => "2",
        getName: () => "Bobby",
        getAge: () => 4,
        getType: () => "dog",
        emitSound: () => "Woof! Woof!",
        getAttributes: () => ({ breed: "Beagle", isGoodBoy: false }),
      },
    ];

    repository.findAll.mockResolvedValue(mockAnimals as any);
    repository.count.mockResolvedValue(5);

    const result = await useCase.execute(dto);

    expect(repository.findAll).toHaveBeenCalledWith("dog", 1, 2);
    expect(repository.count).toHaveBeenCalledWith("dog");

    expect(result).toEqual({
      animals: [
        {
          id: "1",
          name: "Firulais",
          age: 3,
          type: "dog",
          sound: "Woof! Woof!",
          attributes: { breed: "Labrador", isGoodBoy: true },
        },
        {
          id: "2",
          name: "Bobby",
          age: 4,
          type: "dog",
          sound: "Woof! Woof!",
          attributes: { breed: "Beagle", isGoodBoy: false },
        },
      ],
      total: 5,
      page: 1,
      pageSize: 2,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: false,
    });
  });

  it("should handle empty results correctly", async () => {
    const dto: GetAnimalsDto = { type: AnimalType.CAT, page: 1, limit: 10 };

    repository.findAll.mockResolvedValue([]);
    repository.count.mockResolvedValue(0);

    const result = await useCase.execute(dto);

    expect(result).toEqual({
      animals: [],
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });
});
