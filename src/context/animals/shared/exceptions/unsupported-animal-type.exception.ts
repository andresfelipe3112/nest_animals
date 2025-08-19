export class UnsupportedAnimalTypeException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedAnimalTypeException';
  }
}
