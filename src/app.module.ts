import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module.js';
import { IngredientsModule } from './ingredients/ingredients.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/cooking_api'),
    RecipesModule,
    IngredientsModule,
    ServeStaticModule.forRoot({
      rootPath: 'uploads',
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
