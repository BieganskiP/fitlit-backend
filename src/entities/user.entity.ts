import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { Company } from './company.entity';
import { Route } from './route.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  wage: number;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: string;

  @ManyToMany(() => Company)
  @JoinTable({
    name: 'superadmin_companies',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'companyId', referencedColumnName: 'id' },
  })
  superadminCompanies: Company[];

  @Column({ nullable: true, type: 'varchar' })
  invitationToken: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  invitationExpires: Date | null;

  @Column({ default: false })
  isProfileComplete: boolean;

  @OneToMany(() => Route, (route) => route.user)
  routes: Route[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
