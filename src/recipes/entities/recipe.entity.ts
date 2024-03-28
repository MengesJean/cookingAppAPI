import { Schema, model } from 'mongoose';
export interface IRecipe {
    title: string;
    description: string;
    time: number;
    difficulty: number;
    ingredients: {
        ingredient: string;
        quantity: number;
        unit: string
    }[];
}

export const recipeSchema = new Schema<IRecipe>(
    {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        time: { type: 'number', required: true },
        difficulty: { type: 'number', required: true },
        ingredients: [{
            ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
            quantity: { type: 'number'},
            unit: { type: 'string'}
        }]
    }
);



export const Recipe = model<IRecipe>('Recipe', recipeSchema);