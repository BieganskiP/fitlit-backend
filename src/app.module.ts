import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { AddressList } from './entities/address-list.entity';
import { AddressListInfo } from './entities/address-list-info.entity';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GuardsModule } from './guards/guards.module';
import { AddressListModule } from './address-list/address-list.module';
import { Complaint } from './entities/complaint.entity';
import { Route } from './entities/route.entity';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [User, Company, AddressList, AddressListInfo, Complaint, Route],
        synchronize: configService.get('NODE_ENV') === 'DEV',
        ssl: process.env.NODE_ENV === 'production',
      }),
      inject: [ConfigService],
    }),
    MailModule,
    AuthModule,
    UsersModule,
    GuardsModule,
    AddressListModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
