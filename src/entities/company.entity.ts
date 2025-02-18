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
}
