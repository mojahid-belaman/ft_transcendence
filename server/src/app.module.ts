import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from './channels/entity/channels.entity';
import { Users } from './users/entity/users.entity';
import { ConnectionsModule } from './connections/connections.module';
import { MessagesChannelsModule } from './messages-channels/messages-channels.module';
import { MessagesDmsModule } from './messages-dms/messages-dms.module';
import { Connection } from './connections/entities/connection.entity';
import { MessagesChannel } from './messages-channels/entities/messages-channel.entity';
import { MessagesDM } from './messages-dms/entities/messages-dm.entity';
import { ChannelsModule } from './channels/connections.module';
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
    }),/* 
    MulterModule.register({
      dest: './upload'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './', `${process.env.UPLOAD_DEST}`),
    }), */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        Channels,
        Users,
        Connection,
        Conversations,
        // Friendship,
        MessagesChannel,
        MessagesDM,
      ],
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
