import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, ValidateNested, IsMongoId, IsArray } from 'class-validator';

class IngredientDto {
  @IsMongoId()
  readonly ingredient: string;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly unit: string;
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
  readonly difficulty: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  readonly ingredients: IngredientDto[];
}
