import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Client, ClientDocument } from './client.entity';
import { ClientDto } from './client.dto';

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Client.name) private userModel: Model<ClientDocument>,
        private configService: ConfigService) { }

    async create(clientDto: ClientDto, infoToken: any) {
        clientDto._id = infoToken.email;
        const createdUser = await new this.userModel(clientDto).save();
        return createdUser;
    }

    async getByEmail(email: string): Promise<ClientDto> {
        return await this.userModel.findById(email);
    }
}
