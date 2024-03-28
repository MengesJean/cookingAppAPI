import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto.js';
import { UpdateIngredientDto } from './dto/update-ingredient.dto.js';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredients, IngredientsDocument } from '../schemas/ingredients.schema.js';

@Injectable()
export class IngredientsService {

  constructor(
    @InjectModel('Ingredients') private readonly ingredientModel: Model<Ingredients>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<IngredientsDocument> {
    const ingredient = new this.ingredientModel(createIngredientDto);
    return ingredient.save();
  }

  async findAll(): Promise<IngredientsDocument[]> {
    return this.ingredientModel.find();
  }

  findOne(id: string) {
    return this.ingredientModel.findById(id);
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<IngredientsDocument> {
    return this.ingredientModel.findByIdAndUpdate(id, updateIngredientDto);
  }

  async remove(id: string) {
    return this.ingredientModel.findByIdAndDelete(id);
  }
}
