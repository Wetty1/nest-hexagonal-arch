import { IList } from '../entities/list.model';

export class ListCreatedEvent {
  constructor(public list: IList) {}
}
