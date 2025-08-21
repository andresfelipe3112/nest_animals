import { AnimalRepository } from "src/context/animals/domain/repositories/animal.repository";
import { DeleteAnimalDto } from "src/context/animals/application/delete-animal-use-case/delete-animal.dto";
import { AnimalNotFoundException } from "src/context/animals/shared/exceptions/animal-not-found.exception";
import { DeleteAnimalUseCase } from "src/context/animals/application/delete-animal-use-case/delete-animal-use-case";

describe("DeleteAnimalUseCase", () => {
  let useCase: DeleteAnimalUseCase;
  let repository: jest.Mocked<AnimalRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new DeleteAnimalUseCase(repository);
  });

  it("should throw AnimalNotFoundException if animal does not exist", async () => {
    repository.findById.mockResolvedValue(null);

    const dto: DeleteAnimalDto = { id: "123" };

    await expect(useCase.execute(dto)).rejects.toThrow(AnimalNotFoundException);
    expect(repository.findById).toHaveBeenCalledWith("123");
    expect(repository.delete).not.toHaveBeenCalled();
  });

  it("should delete the animal and return success message if animal exists", async () => {
    const mockAnimal = { getId: () => "123" }; 
    repository.findById.mockResolvedValue(mockAnimal as any);
    repository.delete.mockResolvedValue(undefined);

    const dto: DeleteAnimalDto = { id: "123" };

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith("123");
    expect(repository.delete).toHaveBeenCalledWith("123");
    expect(result).toEqual({
      success: true,
      message: "Animal with ID '123' has been deleted successfully",
    });
  });
});
