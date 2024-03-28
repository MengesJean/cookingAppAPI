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

  processFileAndGetImageUrl(file: Express.Multer.File): string {
    if (!file) {
        return ''; // Ou gérer comme vous le souhaitez si aucun fichier n'est fourni
    }
    
    // Si vous servez les fichiers statiques avec NestJS, l'URL pourrait ressembler à ceci
    const baseUrl = 'http://localhost:3000'; // Remplacez par l'URL de base de votre API
    const imageUrl = `${baseUrl}/uploads/${file.filename}`;
    return imageUrl;
  }

  async create(createIngredientDto: CreateIngredientDto, file: Express.Multer.File): Promise<IngredientsDocument> {
    const imageUrl = this.processFileAndGetImageUrl(file);
    const ingredient = new this.ingredientModel({
      ...createIngredientDto,
      imageUrl: imageUrl // Ajoutez le chemin du fichier ici
    });
    return ingredient.save();
  }

  async findAll(): Promise<IngredientsDocument[]> {
    return this.ingredientModel.find();
  }

  findOne(id: string) {
    return this.ingredientModel.findById(id);
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto, file: Express.Multer.File): Promise<IngredientsDocument> {
    const update = {
      ...updateIngredientDto,
    };
    if (file) {
      const imageUrl = this.processFileAndGetImageUrl(file);
      update.imageUrl = imageUrl; // Mettez à jour le chemin du fichier si un nouveau fichier est téléchargé
    }
    return this.ingredientModel.findByIdAndUpdate(id, update);
  }

  async remove(id: string) {
    return this.ingredientModel.findByIdAndDelete(id);
  }
}
