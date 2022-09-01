import { Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/pageMeta.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { Logger } from 'src/config/logger/logging';
import { Repository } from 'typeorm';
import { Municipalities } from './entitities/provinces.entity';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @Logger(Municipalities.name)
    private readonly logger: LoggerService,
    @InjectRepository(Municipalities)
    private readonly usersRepository: Repository<Municipalities>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Municipalities>> {
    const { skip, take, order } = pageOptionsDto;

    const entities = await this.usersRepository.find({
      select: ['id', 'literal', 'height','lat','lng'],
      skip: skip,
      take: take,
      order: { literal: order },
    });
    const itemCount = await this.usersRepository.count();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
