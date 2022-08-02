import { IsEnum, IsJWT, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { FriendshipStatus } from "../entity/friendships.entity";

export class CreateFriendshipsDto {
    @IsUUID()
    firstId: string;
    @IsUUID()
    secondId: string;
    @IsEnum(FriendshipStatus)
    status: FriendshipStatus;
}

export class CreateFriendshipsDtoBody {
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    token: string;
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}

export class AcceptFriendship {
    @IsUUID()
    firstId: string;
    @IsUUID()
    secondId: string;
}