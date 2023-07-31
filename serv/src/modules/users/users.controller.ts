import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/users.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { IUser, updateData } from './users.interface'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Getting a user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getOne(@Param() params: number): Promise<IUser> {
    return this.usersService.getOneUser(params);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, type: User })
  @Delete('?')
  del(@Query('id') id: number): Promise<string> {
    return this.usersService.removeUser(id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/data')
  @UseGuards(JwtAuthGuard)
  updateData(@Body() data: updateData, @Req() req): Promise<string> {
    return this.usersService.updateUser(data, req.user.id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/addMarks/:id')
  @UseGuards(JwtAuthGuard)
  addMarks(@Query() mark: number, @Param() id: number): Promise<string> {
    return this.usersService.addMarks(mark, id);
  }
}
