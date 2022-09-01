import { Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/pageMeta.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { Logger } from 'src/config/logger/logging';
import { Repository } from 'typeorm';
import { AutonomousRegions } from './entitities/AutonomousRegions.entity';

@Injectable()
export class AutonomousRegionsService {
  constructor(
    @Logger(AutonomousRegionsService.name)
    private readonly logger: LoggerService,
    @InjectRepository(AutonomousRegions)
    private readonly usersRepository: Repository<AutonomousRegions>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<AutonomousRegions>> {
    const { skip, take, order } = pageOptionsDto;

    const entities = await this.usersRepository.find({
      select: ['id', 'literal', 'ISO_3166_2', 'area', 'url'],
      relations: { capital: true },
      skip: skip,
      take: take,
      order: { literal: order },
    });
    const itemCount = await this.usersRepository.count();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
