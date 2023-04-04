import { IList } from '../entities/list.model';

export interface IListGatewayPersistence {
  create(newEntity: IList): Promise<IList>;
  find(): Promise<IList[]>;
  findOne(id: number): Promise<IList>;
  delete(id: number): Promise<IList>;
}
