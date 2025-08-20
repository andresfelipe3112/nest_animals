// Excepciones de dominio base
export { DomainException } from './domain.exception';

// Re-exportar las excepciones del contexto de animales
export { AnimalNotFoundException } from '../../../context/animals/domain/exceptions/animal-not-found.exception';
export { UnsupportedAnimalTypeException } from '../../../context/animals/domain/exceptions/unsupported-animal-type.exception';
export { AnimalCreationException } from '../../../context/animals/domain/exceptions/animal-creation.exception';

// Constantes de error
export {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from '../constants/error-constants';
