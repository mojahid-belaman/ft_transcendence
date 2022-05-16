import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConnectionsService } from './connections.service';

@Controller('channels/connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/new")
  join(@Body() createConnectionDto, @Req() req) {
    return this.connectionsService.create({...createConnectionDto, user: req.user.userId});
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  findAll(@Req() req) {
    return this.connectionsService.findAll({user: req.user.userId});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.connectionsService.findOne({id: id, user: req.user.userId})
    .then(connection => {
      return connection;
    });
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.connectionsService.delete({id: id, user: req.user.userId});
  }
}
