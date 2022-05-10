import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesDmsService } from './messages-dms.service';
import { CreateMessagesDmDto } from './dto/create-messages-dm.dto';
import { UpdateMessagesDmDto } from './dto/update-messages-dm.dto';

@Controller('messages-dms')
export class MessagesDmsController {
  constructor(private readonly messagesDmsService: MessagesDmsService) {}

  @Post()
  create(@Body() createMessagesDmDto: CreateMessagesDmDto) {
    return this.messagesDmsService.create(createMessagesDmDto);
  }

  @Get()
  findAll() {
    return this.messagesDmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesDmsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessagesDmDto: UpdateMessagesDmDto) {
    return this.messagesDmsService.update(+id, updateMessagesDmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesDmsService.remove(+id);
  }
}
