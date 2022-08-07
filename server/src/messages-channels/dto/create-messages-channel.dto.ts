import { IsString } from "class-validator";

export class CreateMessagesChannelDto {
    @IsString()
    userId: string;
    @IsString()
    channelId: string;
    @IsString()
    content: string;
}
