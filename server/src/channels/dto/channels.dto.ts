import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString, IsUUID, ValidateIf } from 'class-validator'
import { IsNull } from 'typeorm';
import { channelStatus } from '../entity/channels.entity';

export class CreateChannelDto{
	@IsString()
	name: string;
	@IsString()
	@ValidateIf((object, value) => value === null)
	password: string;
	@IsEnum(channelStatus)
	status: channelStatus;
	@IsString()
	@ValidateIf((object, value) => value === null)
	description: string;
}