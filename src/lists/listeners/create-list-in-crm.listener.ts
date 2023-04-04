import { Inject, Injectable } from '@nestjs/common';
import { ListCreatedEvent } from '../events/list-created.event';
import { IListGatewayCrm } from '../gateways/list-gateway-crm.interface';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CreateListInCrmListener {
  constructor(
    @Inject('IListGatewayCrm') private readonly listGatewayCrm: IListGatewayCrm,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    console.log(event.list);
    await this.listGatewayCrm.create(event.list);
  }
}
