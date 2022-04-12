import { Injectable } from '@nestjs/common';
import { channels, users } from 'src/db';
import { FindUserResponsDto } from 'src/users/dto/users.dto';
import { FindChannelResponseDto } from './dto/channels.dto';

@Injectable()
export class ChannelsService {
	private channels = channels;
  private users = users;
  getchannels(): FindChannelResponseDto[] {
    return this.channels;
  }
  getchannelById(channelId: string): FindChannelResponseDto{
    return this.channels.find((channel) => {
      return channel.id == channelId;
    });
  }
}
