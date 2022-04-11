import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { FindChannelResponseDto } from './dto/channels.dto';

@Controller('channels')
export class ChannelsController {

	constructor(private readonly channelsService:ChannelsService){}
	@Get()
	getChannels():FindChannelResponseDto[]{
		return(this.channelsService.getchannels());
	}
	@Get("/:channelId")
	getChannelById(@Param('channel')channelId:string):FindChannelResponseDto{
		return(this.channelsService.getchannelById(channelId));
	}
}
