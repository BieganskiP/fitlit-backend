import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { AddressListInfo } from './address-list-info.entity';
import { Route } from './route.entity';

export enum ComplaintStatus {
  NEW = 'new',
  IN_PROGRESS = 'inprogress',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  complaintNumber: string;

  @Column()
  cateringCompany: string;

  @Column()
  description: string;

  @Column()
  problemType: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  compensationValue: number;

  @Column()
  route: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: ComplaintStatus,
    default: ComplaintStatus.NEW,
  })
  status: ComplaintStatus;

  @Column({ type: 'date' })
  deliveryDate: Date;

  @ManyToOne(() => Company, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;

  @ManyToOne(() => AddressListInfo, { nullable: false })
  @JoinColumn({ name: 'addressListInfoId' })
  addressListInfo: AddressListInfo;

  @Column()
  addressListInfoId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Route, { nullable: true })
  @JoinColumn({ name: 'routeId' })
  routeEntity: Route;

  @Column({ nullable: true })
  routeId: string;
}
