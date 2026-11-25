import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGameDto } from './dto/create-game.dto.js';
import { UpdateGameDto } from './dto/update-game.dto.js';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    try {
      return await this.prisma.vaultGame.create({
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Game dengan dealId "${dto.dealId}" sudah ada di Vault.`,
        );
      }
      throw error;
    }
  }

  async findAll(filters?: {
    status?: string;
    search?: string;
    minMetacritic?: number;
  }) {
    const where: Prisma.VaultGameWhereInput = {};

    if (filters?.status) {
      where.status = filters.status.toUpperCase();
    }

    if (filters?.search) {
      where.title = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    if (
      filters?.minMetacritic !== undefined &&
      !Number.isNaN(filters.minMetacritic)
    ) {
      where.metacriticScore = {
        gte: filters.minMetacritic,
      };
    }

    return this.prisma.vaultGame.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const game = await this.prisma.vaultGame.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException(`Game dengan id ${id} tidak ditemukan.`);
    }

    return game;
  }

  async update(id: number, dto: UpdateGameDto) {
    await this.findOne(id);
    return this.prisma.vaultGame.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.vaultGame.delete({
      where: { id },
    });
  }

  async getStats() {
    const [totalGames, statusGroups, aggregates] = await Promise.all([
      this.prisma.vaultGame.count(),
      this.prisma.vaultGame.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
      this.prisma.vaultGame.aggregate({
        _avg: { metacriticScore: true, steamRatingPercent: true },
        _sum: { salePrice: true, normalPrice: true },
      }),
    ]);

    const byStatus = statusGroups.reduce<Record<string, number>>((acc, item) => {
      acc[item.status] = item._count.id;
      return acc;
    }, {});

    const totalNormal = aggregates._sum.normalPrice ?? 0;
    const totalSale = aggregates._sum.salePrice ?? 0;

    return {
      totalGames,
      byStatus: {
        BACKLOG: byStatus.BACKLOG ?? 0,
        PLAYING: byStatus.PLAYING ?? 0,
        COMPLETED: byStatus.COMPLETED ?? 0,
      },
      averageMetacritic: Number((aggregates._avg.metacriticScore ?? 0).toFixed(1)),
      averageSteamRating: Number(
        (aggregates._avg.steamRatingPercent ?? 0).toFixed(1),
      ),
      totalSalePrice: Number(totalSale.toFixed(2)),
      totalSavings: Number((totalNormal - totalSale).toFixed(2)),
    };
  }
}