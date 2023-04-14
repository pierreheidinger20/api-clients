import { Body, Controller, Delete, Get, Post, Put, Request } from '@nestjs/common';
import { Roles, RequestDto,ResponseDto } from 'common-features';
import { ClientService } from './client.service';
import { ClientDto } from './client.dto';


@Controller({
    version: '1',
})
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Post()
    async saveOne(@Request() tokenInfo, @Body() body: RequestDto<ClientDto>) {
        const { user } = tokenInfo;
        return   await this.clientService.create(body.data, user);
    }

    @Get()
    async getUserByEmail(@Request() tokenInfo) {
        const { user } = tokenInfo;
        return await this.clientService.getByEmail(user.email);
    }
}
