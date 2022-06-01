import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { IntraAuthModule } from './42-auth/IntraAuth.module';
import { Conversations } from './conversations/entity/conversation.entity';
import { ConversationsModule } from './conversations/conversations.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/*/.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ChannelsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
    ConnectionsModule,
    FriendshipsModule,
    MessagesChannelsModule,
    MessagesDmsModule,
    AuthModule,
    IntraAuthModule,
    ConversationsModule,
  ]
})
export class AppModule { }
