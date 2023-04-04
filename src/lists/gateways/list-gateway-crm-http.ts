import { Injectable } from '@nestjs/common';
import { IListGatewayCrm } from './list-gateway-crm.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IList } from '../entities/list.model';

@Injectable()
export class ListGatewayCrm implements IListGatewayCrm {
  private baseUrl: string = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}
  async create(newList: IList): Promise<void> {
    await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/lists`, newList),
    );
  }
  async find(): Promise<IList[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/lists`),
    );

    return data;
  }
  async findOne(id: number): Promise<IList> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/lists/${id}`),
    );

    return data;
  }
  async delete(id: number): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/lists/${id}/delete`),
    );
  }
}
