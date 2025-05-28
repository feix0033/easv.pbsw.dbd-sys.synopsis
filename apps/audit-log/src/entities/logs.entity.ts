import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('logs')
export class LogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'xml' })
  data: string;
}
