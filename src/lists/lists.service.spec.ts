import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { IListGatewayPersistence } from './gateways/list-gateway-persistence.interface';
import { ListGatewayPersistenceMemory } from './gateways/list-gateway-persistence-memory';
import { IListGatewayCrm } from './gateways/list-gateway-crm.interface';
import { IList } from './entities/list.model';
import { ListCreatedEvent } from './events/list-created.event';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceInMemory: IListGatewayPersistence =
    new ListGatewayPersistenceMemory();
  let eventEmitterMock = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'IListGatewayPersistence',
          useValue: listPersistenceInMemory,
        },
        {
          provide: 'EventEmitter',
          useValue: eventEmitterMock,
        },
        ListsService,
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
    listPersistenceInMemory = module.get<ListGatewayPersistenceMemory>(
      'IListGatewayPersistence',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create a list', async () => {
    const list = new IList();
    list.name = 'new List';
    await service.create({ name: 'new List' });
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'list.created',
      new ListCreatedEvent(list),
    );
  });
});
