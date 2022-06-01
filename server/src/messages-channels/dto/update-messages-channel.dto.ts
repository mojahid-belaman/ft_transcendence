import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagesChannelDto } from './create-messages-channel.dto';

export class UpdateMessagesChannelDto extends PartialType(CreateMessagesChannelDto) {}
