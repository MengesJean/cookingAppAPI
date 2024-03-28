import { Schema,model } from 'mongoose';

export interface IIngredient {
    name: string;
    imageUrl: string;
}

export const ingredientSchema = new Schema<IIngredient>(
    {
        name: { type: 'string', required: true },
        imageUrl: { type: 'string', required: false },
    }
);

export const Ingredient = model<IIngredient>('Ingredient', ingredientSchema);