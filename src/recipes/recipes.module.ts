import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service.js';
import { RecipesController } from './recipes.controller.js';
import { Recipes, RecipesSchema } from '../schemas/recipes.schema.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredients, IngredientsSchema } from '../schemas/ingredients.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipes.name, schema: RecipesSchema },
      { name: Ingredients.name, schema: IngredientsSchema },
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
