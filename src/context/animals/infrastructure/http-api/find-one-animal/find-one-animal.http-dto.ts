import { IsString, IsNotEmpty } from 'class-validator';

export class FindOneAnimalHttpDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
