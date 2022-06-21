import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('conversations/messages')
export class MessagesDmsController {
  constructor(private readonly messagesDmsService: MessagesDmsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  sendMessage(@Body() createMessagesDmDto) {
    return this.messagesDmsService.sendMessage(createMessagesDmDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":conversationId")
  findAll(@Req() req, @Param("conversationId") conversationId: string) {
    return this.messagesDmsService.findAll(conversationId, req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  unsend(@Param('id') id: string) {
    return this.messagesDmsService.remove(+id);
  }
}
