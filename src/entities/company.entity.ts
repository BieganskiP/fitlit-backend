import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { CompanyPlan } from '../enums/company-plan.enum';
import { User } from './user.entity';
import { AddressList } from './address-list.entity';
import { AddressListInfo } from './address-list-info.entity';
import { Complaint } from './complaint.entity';
import { Route } from './route.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  streetName: string;

  @Column({ nullable: true })
  houseNumber: string;

  @Column({ nullable: true })
  postCode: string;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'enum',
    enum: CompanyPlan,
    default: CompanyPlan.BASIC,
  })
  plan: CompanyPlan;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  ownerId: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @ManyToMany(() => User, (user) => user.superadminCompanies)
  superadmins: User[];

  @Column({ default: false })
  isProfileComplete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AddressList, addressList => addressList.company)
  addressLists: AddressList[];

  @OneToMany(() => AddressListInfo, addressListInfo => addressListInfo.company)
  addressListInfos: AddressListInfo[];

  @OneToMany(() => Complaint, complaint => complaint.company)
  complaints: Complaint[];

  @OneToMany(() => Route, route => route.company)
  routes: Route[];
}
