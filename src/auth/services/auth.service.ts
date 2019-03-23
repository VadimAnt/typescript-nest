import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any): Promise<object> {
    return await this.usersService.findOneById(payload.id);
  }
}
