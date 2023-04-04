import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { HttpModule } from '@nestjs/axios';
import { ListGatewayTypeorm } from './gateways/list-gateway-persistence-typeorm';
import { ListGatewayCrm } from './gateways/list-gateway-crm-http';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { PublishListCreatedCrm } from './listeners/publish-list-created-crm.listener';
import { BullModule } from '@nestjs/bull';
import { CreateListInCrmJob } from './jobs/create-list-in-crm.job';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    HttpModule,
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: {
        attempts: 1,
      },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    // CreateListInCrmListener,
    PublishListCreatedCrm,
    CreateListInCrmJob,
    {
      provide: 'IListGatewayPersistence',
      useClass: ListGatewayTypeorm,
    },
    {
      provide: 'IListGatewayCrm',
      useClass: ListGatewayCrm,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
