import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('channels/connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) { }

  @UseGuards(JwtAuthGuard)
  @Get("checkSatus")
  checkSatus(@Req() req) {
    return this.connectionsService.checkSatus(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.connectionsService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/new/:id")
  async join(@Param('id') id, @Body() createConnectionDto, @Req() req) {
    return await this.connectionsService.create({ ...createConnectionDto, userId: id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async findAll(@Req() req) {
    return await this.connectionsService.findAll({ user: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get("/members/:channelId")
  async getMembersById(@Param("channelId") channelId) {
    return await this.connectionsService.getMembersById(channelId)
  }

  @UseGuards(JwtAuthGuard)
  @Put("/members/:channelId/:userId")
  async changeStatus(@Req() req, @Body() body, @Param('userId') userId, @Param('channelId') channelId) {
    return await this.connectionsService.changeStatus(userId, req.user.userId, body, channelId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':channelId/:userId')
  async delete(@Param('userId') userId: string, @Param('channelId') channelId: string, @Req() req) {
    return await this.connectionsService.delete(userId, req.user.userId, channelId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':channelId/:userId')
  async findOne(@Param('userId') userId: string, @Param('channelId') channelId) {
    return await this.connectionsService.findOneWithTypeORM(userId, channelId)
    .then(connection => {
      return connection;
    });
  }
  
  @UseGuards(JwtAuthGuard)
  @Post("mute/:channelId/:userId")
  async muteMember(@Req() req, @Body() body, @Param("channelId") channelId, @Param("userId") userId) {
    console.log("hello from mute function");
    const date = new Date(body.date);
    return await this.connectionsService.muteMember(channelId, userId, date, req.user.userId)
  }

}
