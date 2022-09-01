import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipalities } from './entitities/provinces.entity';
import { MunicipalitiesController } from './municipalities.controller';

import { MunicipalitiesService } from './municipalities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Municipalities])],
  controllers: [MunicipalitiesController],
  providers: [MunicipalitiesService],
})
export class MunicipalitiesModule {}
