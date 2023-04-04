import { IList } from '../entities/list.model';
import { IListGatewayPersistence } from './list-gateway-persistence.interface';

export class ListGatewayPersistenceMemory implements IListGatewayPersistence {
  private _listGatewayPersistence: IList[];

  constructor() {
    this._listGatewayPersistence = [];
  }

  async create(newEntity: IList): Promise<IList> {
    try {
      this._listGatewayPersistence.push(newEntity);
      return newEntity;
    } catch (error) {
      throw new Error(`Failed to create entity ${newEntity.id}. ${error}`);
    }
  }

  async find(): Promise<IList[]> {
    try {
      return this._listGatewayPersistence;
    } catch (error) {
      throw new Error(`Failed to find entities. ${error}`);
    }
  }

  async findOne(id: number): Promise<IList> {
    try {
      const listFounded = this._listGatewayPersistence.find(
        (list) => list.id === id,
      );
      return listFounded;
    } catch (error) {
      throw new Error(`Failed to find entity with id: ${id}. ${error}`);
    }
  }

  async delete(id: number): Promise<IList> {
    try {
      const indexListFounded = this._listGatewayPersistence.findIndex(
        (list) => list.id === id,
      );

      if (indexListFounded === -1) {
        throw new Error(`Entity with id ${id} not found.`);
      }

      const [deletedList] = this._listGatewayPersistence.splice(
        indexListFounded,
        1,
      );

      return deletedList;
    } catch (error) {
      throw new Error(`Failed to delete entity with id: ${id}. ${error}`);
    }
  }
}
