import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RecipesDocument = Recipes & Document<Types.ObjectId>;

class IngredientInRecipe {
  @Prop({ type: Types.ObjectId, ref: 'Ingredient', required: true })
  ingredient: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit: string;
}

class StepsInRecipe {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;
}

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Recipes {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  time: number;

  @Prop({ required: true, type: Number })
  time_cooking: number;

  @Prop({ required: true, type: Number })
  difficulty: number;

  @Prop({ type: [IngredientInRecipe], required: true })
  ingredients: IngredientInRecipe[];

  @Prop({ type: [StepsInRecipe], required: true })
  steps: StepsInRecipe[];
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
