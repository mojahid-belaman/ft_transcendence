import { IsString, IsUUID } from 'class-validator'
import { channelStatus } from '../entity/channels.entity';

export class FindChannelResponseDto{
	@IsUUID()
	id:string;
	@IsString()
	name:string;
	usersId: string[];
	// status: channelStatus
}