import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.99.100',
      port: 5432,
      username: 'shikma',
      password: 'password',
      database: 'db',
      entities: [],
      synchronize: true,
    })
  ],
  controllers: [UsersController, ChannelsController],
  providers: [UsersService, ChannelsService],
})
export class AppModule {}
