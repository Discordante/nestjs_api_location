import { Test, TestingModule } from '@nestjs/testing';
import { AutonomousRegionsService } from './autonomous-regions.service';

describe('AutonomousRegionsService', () => {
  let service: AutonomousRegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutonomousRegionsService],
    }).compile();

    service = module.get<AutonomousRegionsService>(AutonomousRegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
