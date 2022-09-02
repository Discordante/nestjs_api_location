import { Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/pageMeta.dto';
import { PageOptionsDto } from 'src/common/dto/pageOptions.dto';
import { Logger } from 'src/config/logger/logging';
import { isInteger } from 'src/utils/number.utils';
import { In, Repository } from 'typeorm';
import { ProvincesDto } from './dto/provinces.dto';
import { ProvincesByRegionDto } from './dto/provincesByRegion.dto';
import { Provinces } from './entitities/provinces.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @Logger(ProvincesService.name)
    private readonly logger: LoggerService,
    @InjectRepository(Provinces)
    private readonly provincesRepository: Repository<Provinces>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Provinces>> {
    const { skip, take, order } = pageOptionsDto;

    const entities = await this.provincesRepository.find({
      select: ['id', 'literal', 'area', 'url'],
      relations: {
        capital: true,
      },
      skip: skip,
      take: take,
      order: { literal: order },
    });
    const itemCount = await this.provincesRepository.count();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findByIdOrValue(value: string): Promise<Provinces> {
    if (isInteger(value)) {
      return this.findById(parseInt(value));
    }
    return this.findByValue(value);
  }

  async findByValue(isoCode: string): Promise<Provinces> {
    const province = await this.provincesRepository.findOne({
      select: ['id', 'literal', 'area', 'url', 'ISO_3166_2'],
      relations: {
        region: true,
        capital: true,
      },
      where: {
        ISO_3166_2: isoCode,
      },
    });
    if (!province) {
      throw new NotFoundException({
        message: `Could not find resource with value ${isoCode}`,
      });
    }
    return province;
  }

  async findById(id: number): Promise<Provinces> {
    const province = await this.provincesRepository.findOne({
      select: ['id', 'literal', 'area', 'url'],
      relations: {
        region: true,
        capital: true,
      },

      where: {
        id: id,
      },
    });
    if (!province) {
      throw new NotFoundException({
        message: `Could not find resource with value ${id}`,
      });
    }
    return province;
  }
}
