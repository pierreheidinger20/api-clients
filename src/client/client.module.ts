import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { ClientController } from './client.controller';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController,AddressController],
  providers: [ConfigService, ClientService,AddressService],
})
export class ClientModule {}
