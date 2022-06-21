import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConnectionsService } from './connections.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('channels/connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/new")
  async join(@Body() createConnectionDto, @Req() req) {
    return await this.connectionsService.create({...createConnectionDto, user: req.user.userId});
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async findAll(@Req() req) {
    return await this.connectionsService.findAll({user: req.user.userId});
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return await this.connectionsService.findOne({id: id, user: req.user.userId})
    .then(connection => {
      return connection;
    });
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    return await this.connectionsService.delete({id: id, user: req.user.userId});
  }
}
