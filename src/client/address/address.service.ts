import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from '../client.entity';
import { Model } from 'mongoose';
import { AddressDto } from './address.dto';
import { ClientService } from '../client.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Client.name) private userModel: Model<ClientDocument>,
        private clientService: ClientService) { }

    async addAddress(email: string, addressDto: AddressDto) {
        const addresses = await this.getAddressClientByEmail(email);
        const existAddress = addresses.some(address => address.name === addressDto.name)
        if (existAddress) {
            throw new BadRequestException('Address name already exists!')
        }
        await this.userModel.findByIdAndUpdate(email, {
            $push: { addresses: addressDto }
        });
        return this.getAddressClientByEmail(email);
    }
    async deleteAddress(email: string, addressDto: AddressDto) {
        await this.userModel.findByIdAndUpdate(email, {
            $pull: {
                addresses: {
                    'name': addressDto.name
                }
            }
        });
        return await this.getAddressClientByEmail(email);
    }
    async updateAddress(email: any, addressDto: AddressDto) {
        var addresses = await this.getAddressClientByEmail(email);
        const index = addresses.findIndex(address => address.name === addressDto.name);
        if(index < 0) throw new BadRequestException('Address name not exists!')
        addresses[index] = addressDto;
        await this.userModel.findByIdAndUpdate(email, {
            addresses: addresses
        });
        return addresses;
    }
    private  async getAddressClientByEmail(email:string) : Promise<AddressDto[]>{
        return (await this.clientService.getByEmail(email)).addresses;
    }
}
