import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'Bob', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Sponque', description: 'Last name' })
  lastName: string;

  @ApiProperty({ example: 'qwert@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: '111111', description: 'password' })
  password: string;

  @ApiProperty({ example: '+380502221435', description: 'Phone number' })
  phoneNumber: string;

  @ApiProperty({ example: 'Freelancer', description: 'userRole' })
  userRole: string;
}
