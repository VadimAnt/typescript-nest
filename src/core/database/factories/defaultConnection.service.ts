import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../../config/services/config.service';

@Injectable()
export class DefaultConnectionService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService){}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_DEFAULT_CONNECTION_HOST'),
      port: Number(this.configService.get('DATABASE_DEFAULT_CONNECTION_PORT')),
      username: this.configService.get('DATABASE_DEFAULT_CONNECTION_USERNAME'),
      password: this.configService.get('DATABASE_DEFAULT_CONNECTION_PASSWORD'),
      database: this.configService.get('DATABASE_DEFAULT_CONNECTION_DATABASE'),
      entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
