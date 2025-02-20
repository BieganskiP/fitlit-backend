import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressListController } from './address-list.controller';
import { AddressListService } from './address-list.service';
import { AddressList } from '../entities/address-list.entity';
import { AddressListInfo } from '../entities/address-list-info.entity';
import { Route } from '../entities/route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressList, AddressListInfo, Route]),
  ],
  controllers: [AddressListController],
  providers: [AddressListService],
  exports: [AddressListService],
})
export class AddressListModule {} 