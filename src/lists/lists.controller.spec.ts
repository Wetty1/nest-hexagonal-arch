import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { ListGatewayPersistenceMemory } from './gateways/list-gateway-persistence-memory';
import { IListGatewayPersistence } from './gateways/list-gateway-persistence.interface';
import { IListGatewayCrm } from './gateways/list-gateway-crm.interface';

describe('ListsController', () => {
  let controller: ListsController;

  let listPersistenceInMemory: IListGatewayPersistence =
    new ListGatewayPersistenceMemory();
  let listCrm: IListGatewayCrm = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };
  let eventEmitterMock = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        {
          provide: 'IListGatewayPersistence',
          useValue: listPersistenceInMemory,
        },
        {
          provide: 'EventEmitter',
          useValue: eventEmitterMock,
        },
        {
          provide: 'IListGatewayCrm',
          useValue: listCrm,
        },
        ListsService,
      ],
    }).compile();

    controller = module.get<ListsController>(ListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
