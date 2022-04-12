import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesChannelsService } from './messages-channels.service';
import { CreateMessagesChannelDto } from './dto/create-messages-channel.dto';
import { UpdateMessagesChannelDto } from './dto/update-messages-channel.dto';

@Controller('messages-channels')
export class MessagesChannelsController {
  constructor(private readonly messagesChannelsService: MessagesChannelsService) {}

  @Post()
  create(@Body() createMessagesChannelDto: CreateMessagesChannelDto) {
    return this.messagesChannelsService.create(createMessagesChannelDto);
  }

  @Get()
  findAll() {
    return this.messagesChannelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesChannelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessagesChannelDto: UpdateMessagesChannelDto) {
    return this.messagesChannelsService.update(+id, updateMessagesChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesChannelsService.remove(+id);
  }
}
