import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString, IsUUID } from 'class-validator'
import { IsNull } from 'typeorm';
import { channelStatus } from '../entity/channels.entity';

export class CreateChannelDto{
	@IsString()
	name: string;
	@IsString()
	password: string;
	@IsEnum(channelStatus)
	status: channelStatus;
	@IsUUID()
	owner: string;
	@IsDate()
	date: Date;
}