import { Module } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { MessagesDmsController } from './messages-dms.controller';

@Module({
  controllers: [MessagesDmsController],
  providers: [MessagesDmsService]
})
export class MessagesDmsModule {}
