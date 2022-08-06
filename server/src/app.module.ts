import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FriendshipsModule } from './friendships/friendships.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ChannelsModule } from './channels/connections.module';
import { ConnectionsModule } from './connections/connections.module';
import { MessagesChannelsModule } from './messages-channels/messages-channels.module';
import { MessagesDmsModule } from './messages-dms/messages-dms.module';
import { AppGateway } from './app.gateway';
import { FriendshipsService } from './friendships/friendships.service';
import { Friendships } from './friendships/entity/friendships.entity';
import { Users } from './users/entity/users.entity';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { IntraAuthModule } from './intra-auth/IntraAuth.module';
import { AuthModule } from './auth/auth.module';
import { TwofactorauthModule } from './2fa/2fa.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
    ConfigModule.forRoot({
      isGlobal: true
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
    TypeOrmModule.forFeature([Friendships, Users]),
    ChannelsModule,
    ConnectionsModule,
    FriendshipsModule,
    MessagesChannelsModule,
    MessagesDmsModule,
    IntraAuthModule,
    UsersModule,
    AuthModule,
    TwofactorauthModule,
  ],
  providers: [AppGateway, JwtService, FriendshipsService, UsersService]
})
export class AppModule { }
