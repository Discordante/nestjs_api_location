import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dto/page.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { AutonomousRegionsService } from './autonomous-regions.service';
import { AutonomousRegions } from './entitities/AutonomousRegions.entity';

@ApiTags('Autonomous regions')
@Controller('autonomous-regions')
export class AutonomousRegionsController {
  constructor(private readonly autonomousRegionsService: AutonomousRegionsService) {}

  @ApiOkResponse({
    description: 'List of users registration data.',
    type: [PageDto<AutonomousRegions[]>],
  })
  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<AutonomousRegions>> {
    return this.autonomousRegionsService.findAll(pageOptionsDto);
  }
}
