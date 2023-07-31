import { ApiProperty } from '@nestjs/swagger';

export class ContactsEditValue {
    @ApiProperty()
    firstName:string

    @ApiProperty()
    lastName:string

    @ApiProperty()
    email:string

    @ApiProperty()
    phoneNumber:string
}