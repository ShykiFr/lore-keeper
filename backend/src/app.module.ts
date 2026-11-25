import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { GamesModule } from './games/games.module.js';

@Module({
  imports: [PrismaModule, GamesModule],
})
export class AppModule {}