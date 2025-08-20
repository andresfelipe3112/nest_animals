import { DomainException } from '../../../../shared/domain/exceptions/domain.exception';

export class AnimalCreationException extends DomainException {
  readonly code = 'ANIMAL_CREATION_ERROR';
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}
