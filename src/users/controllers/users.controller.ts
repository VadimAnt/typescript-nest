import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../core/decarators/roles.decorator';
import { RolesGuard } from '../../core/guards/roles/roles.guard';
import { User } from '../../core/decarators/user.decorator';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService ) {}

  @Get()
  async findAll(): Promise<any> {
    return 'This acti1on returns all users';
  }

  @Get('/getone')
  @Roles('admin')
  async findOne(): Promise<any> {
    return 'This action returns all cats';
  }

  @Get('/me')
  async currentUser(@User() user: UserEntity): Promise<any> {
    return {
      user,
    };
  }

}
