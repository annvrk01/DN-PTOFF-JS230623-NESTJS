import {
  IsInt,
  Max,
  IsOptional,
  IsPositive,
  IsString,
} from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class UserSearchRequest {

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(1000)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  keyword?: string;
  
}
