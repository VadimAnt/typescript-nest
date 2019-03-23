import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`${__dirname}/../../../env/${process.env.NODE_ENV}.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
