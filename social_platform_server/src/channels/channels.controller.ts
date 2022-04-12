import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {

	constructor(private readonly channelsService:ChannelsService){}
	
	@Get()
	getChannels(){
		return(this.channelsService.getchannels());
	}
	@Get("/:channelId")
	getChannelById(@Param('channel')channelId:string){
		return(this.channelsService.getchannelById(channelId));
	}
}
