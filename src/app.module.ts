import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module.js';
import { IngredientsModule } from './ingredients/ingredients.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/cooking_api'),
    RecipesModule,
    IngredientsModule,
    ServeStaticModule.forRoot({
      rootPath: 'uploads',
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Rend le module global
      envFilePath: [
        `.env.${process.env.NODE_ENV}`, // Charge en premier le fichier spécifique à l'environnement
        '.env', // Charge ensuite le fichier global
      ],
      // ignoreEnvFile: process.env.NODE_ENV === 'production', // Option pour ignorer les fichiers .env en production si nécessaire
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
