import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { List } from './lists/entities/list.entity';
import { ListsModule } from './lists/lists.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ListsModule,
    TypeOrmModule.forRoot({
      database: 'Contacts',
      entities: [List],
      autoLoadEntities: true,
      synchronize: true,
      type: 'sqlite',
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
