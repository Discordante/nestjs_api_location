import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dto/page.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { Municipalities } from './entitities/provinces.entity';
import { MunicipalitiesService } from './municipalities.service';

@ApiTags('Municipalities')
@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @ApiOkResponse({
    description: 'municipalities of Spain.',
    type: [PageDto<Municipalities[]>],
  })
  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Municipalities>> {
    return this.municipalitiesService.findAll(pageOptionsDto);
  }
}
