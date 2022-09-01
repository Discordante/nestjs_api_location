import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PageDto } from 'src/common/dto/page.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { ProvincesDto } from './dto/provinces.dto';
import { ProvincesByRegionDto } from './dto/provincesByRegion.dto';
import { Provinces } from './entitities/provinces.entity';
import { ProvincesService } from './provinces.service';

@ApiTags('Provinces')
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @ApiOkResponse({
    description: 'Returns the provinces of Spain.',
    type: [PageDto<Provinces[]>],
  })
  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,

  ): Promise<PageDto<Provinces>> {
    return this.provincesService.findAll(pageOptionsDto);
  }

  @ApiOkResponse({
    description: 'Returns the indicated province',
    type: Provinces,
  })
  @ApiNotFoundResponse({
    description: 'Province not found with the value provided',
  })
  @ApiParam({
    name: 'value',
    type: 'string',
    examples: {
      id: {
        value: '07',
      },
      literal: {
        value: 'Burgos',
      },
    },
  })
  @Get(':value')
  async findByValue(@Param('value') value: string): Promise<Provinces> {
    return this.provincesService.findByIdOrValue(value);
  }
}
