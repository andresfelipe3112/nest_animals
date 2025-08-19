import { HttpException, HttpStatus } from '@nestjs/common';

export class AnimalNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Animal with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
