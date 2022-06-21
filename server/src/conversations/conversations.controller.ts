import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConversationsService } from './conversations.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() body) {
    return await this.conversationsService.create({first: req.user.userId, ...body});
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getConversations(@Req() req) {
    return await this.conversationsService.getConversations(req.user.userId);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getSingleConversation(@Req() req, @Param("id") id) {
    return await this.conversationsService.getSingleConversation(id, req.user.userId);
  }
}
