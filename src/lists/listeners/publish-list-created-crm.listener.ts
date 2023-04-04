import { Inject, Injectable } from '@nestjs/common';
import { ListCreatedEvent } from '../events/list-created.event';
import { IListGatewayCrm } from '../gateways/list-gateway-crm.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class PublishListCreatedCrm {
  constructor(
    @InjectQueue('default')
    private readonly queue: Queue,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    console.log(event.list);
    this.queue.add('list.created', event);
  }
}
