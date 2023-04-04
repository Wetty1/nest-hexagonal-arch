import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { IListGatewayPersistence } from './gateways/list-gateway-persistence.interface';
import EventEmitter from 'events';
import { ListCreatedEvent } from './events/list-created.event';
import { IList } from './entities/list.model';

@Injectable()
export class ListsService {
  constructor(
    @Inject('IListGatewayPersistence')
    private readonly listPersistenceGateway: IListGatewayPersistence,
    @Inject('EventEmitter')
    private readonly eventEmitter: EventEmitter,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new IList();
    list.name = createListDto.name;

    await this.listPersistenceGateway.create(createListDto);
    this.eventEmitter.emit('list.created', new ListCreatedEvent(list));
    return list;
  }

  async findAll() {
    return this.listPersistenceGateway.find();
  }

  async findOne(id: number) {
    return this.listPersistenceGateway.findOne(id);
  }

  async update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  async remove(id: number) {
    // await this.listHttpGateway.delete(id);
    await this.listPersistenceGateway.delete(id);
  }
}
