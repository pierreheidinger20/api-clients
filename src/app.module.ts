import { ConsoleLogger, Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config, JwtAuthGuard, RolesGuard } from 'common-features';
import { ClientModule } from './client/client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Database } from './configuration/interfaces/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dataBaseConfig = configService.get<Database>('database');
        const uri = `mongodb+srv://${dataBaseConfig.user}:${dataBaseConfig.password}@${dataBaseConfig.server}/${dataBaseConfig.database}?retryWrites=true&w=majority`;
        return { uri, useNewUrlParser: true };
      },
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'client',
        module: ClientModule,
      }
    ]),
    ClientModule
  ],
  providers: [
    ConsoleLogger,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule { }
