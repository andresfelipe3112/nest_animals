import { DomainException } from '../../../../shared/domain/exceptions/domain.exception';

export class UnsupportedAnimalTypeException extends DomainException {
  readonly code = 'UNSUPPORTED_ANIMAL_TYPE';
  readonly statusCode = 422;

  constructor(message: string) {
    super(message);
  }
}
