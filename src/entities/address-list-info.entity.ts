import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { AddressList } from './address-list.entity';
import { Complaint } from './complaint.entity';
import { Route } from './route.entity';

@Entity('address_list_info')
export class AddressListInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numberOfStops: number;

  @Column()
  numberOfPackages: number;

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

  @OneToMany(() => AddressList, addressList => addressList.addressListInfo)
  addressLists: AddressList[];

  @OneToMany(() => Complaint, complaint => complaint.addressListInfo)
  complaints: Complaint[];

  @CreateDateColumn()
  createdAt: Date;
} 