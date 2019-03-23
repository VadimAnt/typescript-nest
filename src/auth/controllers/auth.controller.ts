import { Controller, Post, Body, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/signup.dto';
import { SigninDto } from '../dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signin')
  async signin(@Body() signInData: SigninDto) {
    const existUser = await this.usersService.findOneByEmail(signInData.email);
    if (!existUser) {
      throw new BadRequestException('Not found user');
    }

    const token = await this.authService.signIn({
      id: existUser.id,
      email: existUser.email,
    });

    return { token };
  }

  @Post('/signup')
  async signup(@Body() signUpData: SignupDto) {
    const existUser = await this.usersService.findOneByEmail(signUpData.email);
    console.log(existUser);
    if (existUser) {
      throw new ConflictException('User already exist');
    }

    const newUser = await this.usersService.createUser(signUpData);
    const token = await this.authService.signIn(newUser);
    return { newUser, token };
  }
}
