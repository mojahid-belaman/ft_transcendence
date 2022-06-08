import { Module } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { MessagesDmsController } from './messages-dms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesDM } from './entities/messages-dm.entity';
import { MessagesDmsGateway } from './messages-dms.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesDM])
  ],
  controllers: [MessagesDmsController],
  providers: [MessagesDmsService, MessagesDmsGateway]
})
export class MessagesDmsModule {}
