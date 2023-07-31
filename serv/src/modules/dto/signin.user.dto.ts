import {ApiProperty} from "@nestjs/swagger";

export class SigninFormDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}