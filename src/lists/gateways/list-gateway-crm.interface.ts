import { IList } from '../entities/list.model';

export interface IListGatewayCrm {
  create(newList: IList): Promise<void>;
  find(): Promise<IList[]>;
  findOne(id: number): Promise<IList>;
  delete(id: number): Promise<void>;
}
