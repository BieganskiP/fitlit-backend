import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GuardsModule } from './guards/guards.module';

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
        entities: [User, Company],
        synchronize: configService.get('NODE_ENV') === 'DEV',
        ssl: process.env.NODE_ENV === 'production',
      }),
      inject: [ConfigService],
    }),
    MailModule,
    AuthModule,
    UsersModule,
    GuardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
