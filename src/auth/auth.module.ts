import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '../core/config/config.module';
import { ConfigService } from '../core/config/services/config.service';
import { CryptoService } from '../core/services/crypto.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secretOrPrivateKey: configService.get('JWT_SECRET'),
          signOptions: {},
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, CryptoService],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
