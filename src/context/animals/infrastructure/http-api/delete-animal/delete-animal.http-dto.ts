import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAnimalHttpDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;
}
