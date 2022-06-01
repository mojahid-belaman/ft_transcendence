import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body) {
    return this.conversationsService.create({first: req.user.userId, ...body});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getConversations(@Req() req) {
    return this.conversationsService.getConversations(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getSingleConversation(@Req() req, @Param("id") id) {
    return this.conversationsService.getSingleConversation(id, req.user.userId);
  }
}
