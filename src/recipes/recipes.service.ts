import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { UpdateRecipeDto } from './dto/update-recipe.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipes, RecipesDocument } from '../schemas/recipes.schema.js';

@Injectable()
export class RecipesService {

  constructor(
    @InjectModel('Recipes') private readonly recipeModel: Model<Recipes>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<RecipesDocument> {
    const recipe = new this.recipeModel(createRecipeDto);
    return recipe.save();
  }

  async findAll(): Promise<RecipesDocument[]> {
    return this.recipeModel.find();
  }

  findOne(id: string) {
    return this.recipeModel.findById(id)
    .populate({ 
      path: 'ingredients.ingredient', 
      model: 'Ingredients', 
      select: 'name'
    });
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipesDocument> {
    return this.recipeModel.findByIdAndUpdate(id, updateRecipeDto);
  }

  async remove(id: string) {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
