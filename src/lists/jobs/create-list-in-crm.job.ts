import { Inject } from '@nestjs/common';
import { IListGatewayCrm } from '../gateways/list-gateway-crm.interface';
import { Job } from 'bull';
import { OnQueueFailed, Process, Processor } from '@nestjs/bull';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('IListGatewayCrm')
    private readonly listGatewayCrm: IListGatewayCrm,
  ) {}

  @Process('list.created')
  async handle(job: Job) {
    console.log('job processando...');
    console.log(job.data);
    const event = job.data;
    await this.listGatewayCrm.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log('CreatedListInCrmJob');
  }
}
