import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('conversations/messages')
export class MessagesDmsController {
  constructor(private readonly messagesDmsService: MessagesDmsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("debug")
  sendMessage(@Req() req, @Body() createMessagesDmDto) {
    return this.messagesDmsService.sendMessage({firstId: req.user.userId, ...createMessagesDmDto});
  }

  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllConversations(@Req() req) {
    return this.messagesDmsService.getAllConversations(req.user.userId);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":login")
  findAll(@Req() req, @Param("login") login: string) {    
    return this.messagesDmsService.findAll(login, req.user.userId);
  }
}
