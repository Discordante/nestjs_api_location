import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Max, Min } from 'class-validator';

export class ProvincesDto {
  @ApiPropertyOptional({
    description: 'Autonomous Region id',
    minimum: 1,
    maximum: 19,
    example: '09',
  })
  @Min(1)
  @Max(19)
  @IsOptional()
  readonly id?: number;

  @ApiPropertyOptional({
    description: 'Province ISO-3166-2 Code',
    example: 'ES-MA',
  })
  @IsOptional()
  readonly literal?: string;
}
