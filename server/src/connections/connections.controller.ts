import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('channels/connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}


  @UseGuards(JwtAuthGuard)
  @Get("checkSatus")
  checkSatus(@Req() req) {
    console.log(req.user.userId);
    
    return this.connectionsService.checkSatus(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.connectionsService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/new")
  async join(@Body() createConnectionDto, @Req() req) {    
    return await this.connectionsService.create({...createConnectionDto, userId: req.user.userId});
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

  @UseGuards(JwtAuthGuard)
  @Get("/members/:id")
  getMembersById(@Param("id") id) {
    return this.connectionsService.getMembersById(id)
  }
}
