import { Schema,model } from 'mongoose';

export interface IIngredient {
    name: string;
    recipes: string[];
}

export const ingredientSchema = new Schema<IIngredient>(
    {
        name: { type: 'string', required: true },
        recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
    }
);

export const Ingredient = model<IIngredient>('Ingredient', ingredientSchema);