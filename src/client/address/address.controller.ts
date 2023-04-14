import { Body, Controller, Delete, Get, Post, Put, Request } from '@nestjs/common';
import { Roles, RequestDto } from 'common-features';
import { AddressService } from './address.service';
import { AddressDto } from './address.dto';


@Controller({
    version: '1',
})
export class AddressController {
    constructor(private addressService: AddressService) { }

    @Post('address')
    async addAddress(@Request() tokenInfo, @Body() body: RequestDto<AddressDto>) {
        const { user } = tokenInfo;
        return await this.addressService.addAddress(user.email,body.data);
    }

    @Delete('address')
    async deleteAddress(@Request() tokenInfo, @Body() body: RequestDto<AddressDto>) {
        const { user } = tokenInfo;
        return await this.addressService.deleteAddress(user.email,body.data);
    }

    @Put('address')
    async updateAddress(@Request() tokenInfo, @Body() body: RequestDto<AddressDto>) {
        const { user } = tokenInfo;
        return await this.addressService.updateAddress(user.email,body.data);
    }
}
