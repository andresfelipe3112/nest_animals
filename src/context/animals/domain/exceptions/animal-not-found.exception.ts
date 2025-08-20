import { DomainException } from '../../../../shared/domain/exceptions/domain.exception';

export class AnimalNotFoundException extends DomainException {
  readonly code = 'ANIMAL_NOT_FOUND';
  readonly statusCode = 404;

  constructor(message: string) {
    super(message);
  }
}
