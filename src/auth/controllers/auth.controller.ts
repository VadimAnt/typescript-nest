import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from '../services/auth.service';
import { UserCreateDto } from '../../users/dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('/signin')
  async signin() {
    const token = await this.authService.signIn({
      id: 29
    });
    return {
      token,
    };
  }

  @Post('/signup')
  async signup(@Body() user: UserCreateDto) {
    const newUser = await this.usersService.createUser(user);
    const token = await this.authService.signIn(newUser);
    return {
      newUser,
      token,
    };
  }
}
