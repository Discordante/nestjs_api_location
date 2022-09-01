import { Test, TestingModule } from '@nestjs/testing';
import { AutonomousRegionsController } from './autonomous-regions.controller';

describe('AutonomousRegionsController', () => {
  let controller: AutonomousRegionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutonomousRegionsController],
    }).compile();

    controller = module.get<AutonomousRegionsController>(AutonomousRegionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
