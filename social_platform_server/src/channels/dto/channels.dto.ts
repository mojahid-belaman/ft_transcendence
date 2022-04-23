import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString, IsUUID } from 'class-validator'
import { channelStatus } from '../entity/channels.entity';

export class FindChannelResponseDto{
	@IsUUID()
	id: string;
	@IsString()
	name: string;
	@IsEnum(channelStatus)
	status: channelStatus;
	@IsArray()
	@Type(() => String)
	usersId: string[];
	@IsUUID()
	owner: string;
	@IsDate()
	date: Date;
}