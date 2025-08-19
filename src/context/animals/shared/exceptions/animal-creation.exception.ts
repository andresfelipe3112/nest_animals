export class AnimalCreationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnimalCreationException';
  }
}
