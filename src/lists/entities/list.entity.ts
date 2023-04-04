import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IList } from './list.model';

@Entity()
export class List extends IList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
