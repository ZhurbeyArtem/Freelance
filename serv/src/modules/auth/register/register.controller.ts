import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from '../../dto/create.user.dto';
import { User } from '../../../entities/users.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Регистрация')
@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  create(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.registerService.registration(userDto);
  }
}
