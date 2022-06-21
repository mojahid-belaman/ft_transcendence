import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/channels.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('channels')
export class ChannelsController {

	constructor(private readonly channelsService:ChannelsService){}
	
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async getChannels(){
		return await this.channelsService.getchannels();
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("/:channelId")
	async getChannelById(@Param('channel')channelId:string) {
		return await this.channelsService.getchannelById(channelId);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async createChannel(@Req() req, @Body() body: CreateChannelDto) {
		console.log(body);
		return await this.channelsService.createChannel({...body, owner: req.user.userId});
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("/owner/me")
	async getChannelsAswOwner(@Req() req) {
		return await this.channelsService.getchannelsByConditon({owner: req.user.userId});
	}
}
