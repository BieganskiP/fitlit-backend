import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Complaint } from './complaint.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne('Company', 'routes', { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: any;

  @Column()
  companyId: string;

  @ManyToOne('User', 'routes', { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: any;

  @Column({ nullable: true })
  userId: string;

  @OneToMany('AddressListInfo', 'route')
  addressListInfos: any[];

  @OneToMany(() => Complaint, complaint => complaint.routeEntity)
  complaints: Complaint[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 