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

@Entity('address_list')
export class AddressList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cateringName: string;

  @Column()
  city: string;

  @Column()
  postCode: string;

  @Column()
  address: string;

  @Column()
  deliveryTime: string; // Will store as '06:30' format

  @Column({ nullable: true })
  instruction: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  gateCode: string;

  @Column()
  route: string;

  @ManyToOne(() => Route, { nullable: true })
  @JoinColumn({ name: 'routeId' })
  routeEntity: Route;

  @Column({ nullable: true })
  routeId: string;

  @Column({ type: 'date' })
  date: Date;

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
}
