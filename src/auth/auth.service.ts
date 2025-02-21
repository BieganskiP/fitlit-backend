import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateInvitationDto } from '../dto/user/create-invitation.dto';
import { CompleteRegistrationDto } from '../dto/user/complete-registration.dto';
import { MailService } from '../mail/mail.service';
import { UserRole } from '../enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserStatus } from 'src/enums/user-status.enum';
import { CreateSuperAdminDto } from '../dto/user/create-superadmin.dto';
import { ConfigService } from '@nestjs/config';
import { CompanyService } from '../company/company.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly companyService: CompanyService,
  ) {}

  async createNewClientInvitation(createInvitationDto: CreateInvitationDto) {
    const { email } = createInvitationDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Użytkownik z tym adresem email już istnieje',
      );
    }

    // Create invitation token
    const token = uuidv4();
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 24);

    // Create user with invitation token
    const user = this.userRepository.create({
      email,
      invitationToken: token,
      invitationExpires: expiresIn,
      role: UserRole.OWNER, // They will be company owners
    });

    await this.userRepository.save(user);
    await this.mailService.sendNewClientInvitation(email, token);

    return { message: 'Zaproszenie zostało wysłane pomyślnie' };
  }

  async createCompanyMemberInvitation(
    createInvitationDto: CreateInvitationDto,
    currentUser: User,
  ) {
    const { email } = createInvitationDto;

    // First get the current user with company relation
    const userWithCompany = await this.userRepository.findOne({
      where: { id: currentUser.id },
      relations: ['company'],
    });

    if (!userWithCompany || !userWithCompany.company) {
      throw new BadRequestException('Nie znaleziono firmy');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Użytkownik z tym adresem email już istnieje',
      );
    }

    // Verify inviter has permission (must be OWNER or ADMIN)
    if (![UserRole.OWNER, UserRole.ADMIN].includes(currentUser.role)) {
      throw new UnauthorizedException(
        'Tylko właściciel lub administrator może zapraszać nowych użytkowników',
      );
    }

    // Create invitation token
    const token = uuidv4();
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 24);

    // Create user with invitation token
    const user = this.userRepository.create({
      email,
      invitationToken: token,
      invitationExpires: expiresIn,
      role: UserRole.USER,
      companyId: currentUser.companyId,
    });

    await this.userRepository.save(user);
    await this.mailService.sendCompanyMemberInvitation(
      email,
      token,
      userWithCompany.company.name,
      `${userWithCompany.firstName} ${userWithCompany.lastName}`,
    );

    return { message: 'Zaproszenie zostało wysłane pomyślnie' };
  }

  async completeRegistration(completeRegistrationDto: CompleteRegistrationDto) {
    const { token, password } = completeRegistrationDto;

    const user = await this.userRepository.findOne({
      where: { invitationToken: token },
      relations: ['company'],
    });

    if (!user) {
      throw new BadRequestException('Nieprawidłowy token');
    }

    // Check if invitationExpires exists and is not expired
    if (!user.invitationExpires || user.invitationExpires < new Date()) {
      throw new BadRequestException('Token wygasł');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.invitationToken = null;
    user.invitationExpires = null;
    user.status = UserStatus.ACTIVE;

    // If this is an owner registration (no company assigned yet)
    if (user.role === UserRole.OWNER && !user.companyId) {
      // Create a new company for the owner
      const company = await this.companyService.create(
        { name: `${user.firstName}'s Company` }, // Default name, they can change it later
        user,
      );
      user.companyId = company.id;
    }

    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
      },
      token,
    };
  }

  async validateUser(email: string, password: string) {
    // We need to explicitly select the password field since it's excluded by default
    const user = await this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'role',
        'status',
        'companyId',
        'isProfileComplete',
        'firstName',
        'lastName',
      ],
      relations: ['company'],
    });

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    if (!user.password) {
      throw new BadRequestException(
        'Konto nie zostało jeszcze aktywowane. Sprawdź swoją skrzynkę email',
      );
    }

    // Make sure both password and hash exist before comparing
    if (!password || !user.password) {
      throw new BadRequestException('Nieprawidłowe dane logowania');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedException(
        'Twoje konto zostało zablokowane. Skontaktuj się z administratorem',
      );
    }

    return user;
  }

  async changeUserRole(userId: string, newRole: UserRole, currentUser: User) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userToUpdate) {
      throw new BadRequestException('Nie znaleziono użytkownika');
    }

    const roleHierarchy = {
      [UserRole.SUPERADMIN]: 5,
      [UserRole.OWNER]: 4,
      [UserRole.ADMIN]: 3,
      [UserRole.LEADER]: 2,
      [UserRole.USER]: 1,
    };

    // Check if current user has higher role than both the target user and the new role
    if (
      roleHierarchy[currentUser.role] <= roleHierarchy[userToUpdate.role] ||
      roleHierarchy[currentUser.role] <= roleHierarchy[newRole]
    ) {
      throw new UnauthorizedException(
        'Niewystarczające uprawnienia do zmiany roli',
      );
    }

    // Check if users are in the same company (except for SUPERADMIN)
    if (
      currentUser.role !== UserRole.SUPERADMIN &&
      currentUser.companyId !== userToUpdate.companyId
    ) {
      throw new UnauthorizedException(
        'Możesz zarządzać tylko użytkownikami z własnej firmy',
      );
    }

    userToUpdate.role = newRole;
    return this.userRepository.save(userToUpdate);
  }

  async inviteToCompany(email: string, companyId: string, currentUser: User) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException(
        'Nie znaleziono użytkownika z tym adresem email',
      );
    }

    if (user.companyId === companyId) {
      throw new BadRequestException('Użytkownik jest już członkiem tej firmy');
    }

    const token = uuidv4();
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 24);

    user.invitationToken = token;
    user.invitationExpires = expiresIn;

    await this.userRepository.save(user);
    await this.mailService.sendCompanyMemberInvitation(
      email,
      token,
      currentUser.company.name,
      `${currentUser.firstName} ${currentUser.lastName}`,
    );

    return { message: 'Zaproszenie do firmy zostało wysłane pomyślnie' };
  }

  async createSuperAdmin(createSuperAdminDto: CreateSuperAdminDto) {
    const { email, password, setupKey } = createSuperAdminDto;

    // Verify setup key
    const validSetupKey = this.configService.get<string>('SETUP_KEY');
    if (!validSetupKey || setupKey !== validSetupKey) {
      throw new UnauthorizedException('Invalid setup key');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Użytkownik z tym adresem email już istnieje',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create superadmin user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.SUPERADMIN,
      isProfileComplete: false,
      status: UserStatus.ACTIVE,
    });

    await this.userRepository.save(user);

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.validateUser(email, password);

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Konto jest nieaktywne');
    }

    // Return user data without sensitive information
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isProfileComplete: user.isProfileComplete,
      company: user.company
        ? {
            id: user.company.id,
            name: user.company.name,
            plan: user.company.plan,
          }
        : null,
    };

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    });

    return {
      user: userData,
      token,
    };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    // Find user with password field
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password'], // We need to explicitly select password
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await this.userRepository.save(user);

    return { message: 'Password changed successfully' };
  }
}
