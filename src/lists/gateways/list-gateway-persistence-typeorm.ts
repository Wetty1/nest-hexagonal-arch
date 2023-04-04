import { Injectable } from '@nestjs/common';
import { IList } from '../entities/list.model';
import { IListGatewayPersistence } from './list-gateway-persistence.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../entities/list.entity';

@Injectable()
export class ListGatewayTypeorm implements IListGatewayPersistence {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}
  async create(newEntity: IList): Promise<IList> {
    const entity = this.listRepository.create(newEntity);
    return await this.listRepository.save(entity);
  }
  async find(): Promise<IList[]> {
    return await this.listRepository.find();
  }
  async findOne(id: number): Promise<IList> {
    return await this.listRepository.findOne({ where: { id: id } });
  }
  async delete(id: number): Promise<IList> {
    const list = await this.listRepository.findOne({ where: { id: id } });
    await this.listRepository.delete(id);
    return list;
  }
}
