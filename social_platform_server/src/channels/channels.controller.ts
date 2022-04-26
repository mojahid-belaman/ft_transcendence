import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {

	constructor(private readonly channelsService:ChannelsService){}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	getChannels(){
		return(this.channelsService.getchannels());
	}

	@UseGuards(JwtAuthGuard)
	@Get("/:channelId")
	getChannelById(@Param('channel')channelId:string){
		return(this.channelsService.getchannelById(channelId));
	}
	@UseGuards(JwtAuthGuard)
	@Post()
	createChannel(@Req() req, @Body() body) {
		return this.channelsService.createChannel({...body, owner: req.user.userId});
	}
	@UseGuards(JwtAuthGuard)
	@Get("/owner/me")
	getChannelsAswOwner(@Req() req, @Body() body) {
		return this.channelsService.getchannelsByConditon({owner: req.user.userId});
	}
}
