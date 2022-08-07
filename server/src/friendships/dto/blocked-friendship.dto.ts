import { IsEnum, IsJWT, IsNotEmpty, IsString, IsUUID } from "class-validator";


export class BlockedFriendshipsDtoBody {
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    token: string;
    @IsUUID()
    @IsNotEmpty()
    blockedUserId: string;
}