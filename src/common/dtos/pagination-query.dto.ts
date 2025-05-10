import { IsInt, IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsInt()
  @IsOptional()
  @IsPositive()
  limit: number = 10;

  @IsInt()
  @IsOptional()
  @IsPositive()
  page: number = 1;
}
