import { Test, TestingModule } from '@nestjs/testing';
import { MesageProducerService } from './mesage-producer.service';

describe('MesageProducerService', () => {
  let service: MesageProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesageProducerService],
    }).compile();

    service = module.get<MesageProducerService>(MesageProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
