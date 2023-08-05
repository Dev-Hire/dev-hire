import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:async (config:ConfigService) => ({
          uri:config.get<string>('MONGODB_URI')
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
