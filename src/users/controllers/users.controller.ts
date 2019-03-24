import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../core/decarators/roles.decorator';
import { RolesGuard } from '../../core/guards/roles/roles.guard';
import { User } from '../../core/decarators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { UpdateDto } from '../dto/update.dto';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService ) {}

  @Get()
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @Roles('admin')
  async findOne(@Param() params): Promise<any> {
    const user = await this.usersService.findOneById(params.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return { user };
  }

  @Post('/:id')
  @Roles('admin')
  async updateOne(@Param() params, @Body() updateData: UpdateDto): Promise<any> {
    const user = await this.usersService.findOneById(params.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.name = updateData.name;
    await this.usersService.update(user);
    return { user };
  }

  @Get('/me')
  @Roles('admin')
  async currentUser(@User() user: UserEntity): Promise<any> {
    return { user };
  }

}
