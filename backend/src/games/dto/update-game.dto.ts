import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  thumb?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  steamRatingPercent?: number;

  @IsOptional()
  @IsString()
  steamRatingText?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  steamRatingCount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  metacriticScore?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  normalPrice?: number;

  @IsOptional()
  @IsNumber()
  dealRating?: number;

  @IsOptional()
  @IsInt()
  releaseYear?: number;

  @IsOptional()
  @IsIn(['BACKLOG', 'PLAYING', 'COMPLETED'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}