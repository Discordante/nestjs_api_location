import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ProvincesByRegionDto {
  @ApiPropertyOptional({
    description: 'Autonomous community identifier',
    example: 9,
    minimum: 1,
    maximum: 19,
    default: null,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(19)
  @IsOptional()
  readonly regionId?: number;
}
