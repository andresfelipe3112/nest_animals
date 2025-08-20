import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { AnimalType } from '../../../domain/value-objects/animal-type.vo';

@ValidatorConstraint({ name: 'isValidAnimalAttributes', async: false })
export class IsValidAnimalAttributesConstraint
  implements ValidatorConstraintInterface
{
  validate(attributes: any, args: ValidationArguments): boolean {
    const object = args.object as any;
    const type = object.type as AnimalType;

    if (!attributes || typeof attributes !== 'object') {
      return false;
    }

    switch (type) {
      case AnimalType.DOG:
        return this.validateDogAttributes(attributes);
      case AnimalType.CAT:
        return this.validateCatAttributes(attributes);
      case AnimalType.COW:
        return this.validateCowAttributes(attributes);
      default:
        return false;
    }
  }

  private validateDogAttributes(attributes: any): boolean {
    return (
      typeof attributes.breed === 'string' &&
      attributes.breed.trim() !== '' &&
      typeof attributes.isGoodBoy === 'boolean'
    );
  }

  private validateCatAttributes(attributes: any): boolean {
    return (
      typeof attributes.color === 'string' &&
      attributes.color.trim() !== '' &&
      typeof attributes.isIndoor === 'boolean'
    );
  }

  private validateCowAttributes(attributes: any): boolean {
    return (
      typeof attributes.weight === 'number' &&
      attributes.weight > 0 &&
      typeof attributes.milkProduction === 'number' &&
      attributes.milkProduction >= 0
    );
  }

  defaultMessage(args: ValidationArguments): string {
    const object = args.object as any;
    const type = object.type as AnimalType;

    switch (type) {
      case AnimalType.DOG:
        return 'Dog attributes must include: breed (string) and isGoodBoy (boolean)';
      case AnimalType.CAT:
        return 'Cat attributes must include: color (string) and isIndoor (boolean)';
      case AnimalType.COW:
        return 'Cow attributes must include: weight (positive number) and milkProduction (non-negative number)';
      default:
        return 'Invalid animal type or attributes';
    }
  }
}

export function IsValidAnimalAttributes(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidAnimalAttributesConstraint,
    });
  };
}
