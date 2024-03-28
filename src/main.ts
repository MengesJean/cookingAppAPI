import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import express, { Express } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  // Créer une instance d'Express pour configurer le service de fichiers statiques
  const server: Express = express();

  // Conversion de import.meta.url en chemin de fichier pour obtenir __dirname
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Configurer le dossier 'uploads' pour servir des fichiers statiques
  server.use('/uploads', express.static(join(__dirname, 'uploads')));

  // Appliquer la configuration d'Express à l'application Nest
  app.use(server);

  await app.listen(3000);
}

bootstrap();