import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('audit_logs')
export class AuditLogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'xml' })
  data: string;
}
