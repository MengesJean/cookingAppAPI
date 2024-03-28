import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";


export type IngredientsDocument = Ingredients & Document<Types.ObjectId>;

@Schema({
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Ingredients {
  @Prop({required: true, type: String})
  name: string;

  @Prop({required: false, type: String})
  imageUrl: string;
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);