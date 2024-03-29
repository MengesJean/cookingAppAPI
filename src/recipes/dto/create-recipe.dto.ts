import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';

class IngredientDto {
  @IsMongoId()
  readonly ingredient: string;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly unit: string;
}

class StepsDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;
}

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  readonly time: number;

  @IsNumber()
  readonly time_cooking: number;

  @IsNumber()
  readonly difficulty: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  readonly ingredients: IngredientDto[];

  @IsArray()
  @ValidateNested({ each: true })
  readonly steps: StepsDto[];
}
