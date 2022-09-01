import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutonomousRegionsController } from './autonomous-regions.controller';
import { AutonomousRegionsService } from './autonomous-regions.service';
import { AutonomousRegions } from './entitities/AutonomousRegions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutonomousRegions])],
  controllers: [AutonomousRegionsController],
  providers: [AutonomousRegionsService],
})
export class AutonomousRegionsModule {}
