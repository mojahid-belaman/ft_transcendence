import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
  
    TypeOrmModule.forRoot(),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
