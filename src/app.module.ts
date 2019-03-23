import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './core/config/config.module';
import { DefaultConnectionService } from './core/database/factories/defaultConnection.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({ imports: [ConfigModule], useClass: DefaultConnectionService }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
