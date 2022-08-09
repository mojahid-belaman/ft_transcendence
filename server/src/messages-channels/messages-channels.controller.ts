import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessagesChannelsService } from './messages-channels.service';
import { CreateMessagesChannelDto } from './dto/create-messages-channel.dto';
import { UpdateMessagesChannelDto } from './dto/update-messages-channel.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('channels/messages')
export class MessagesChannelsController {
  constructor(private readonly messagesChannelsService: MessagesChannelsService) {}

  /* @UseGuards(JwtAuthGuard)
  @Get()
  getAllConversations(@Req() req) {
    return this.messagesChannelsService.getAllChannels(req.user.userId);
  } */

  @UseGuards(JwtAuthGuard)
  @Get(":channelId")
  getAllMessagesChannel(@Param('channelId') channelId: string, @Req() req) {
    return this.messagesChannelsService.findAll(channelId, req.user.userId);
  }

}
