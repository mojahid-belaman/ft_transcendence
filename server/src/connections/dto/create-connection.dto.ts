import { IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateConnectionDto {
    @IsUUID()
    userId: string;
    @IsUUID()
    channelId: string;
    @IsString()
    @ValidateIf((object, value) => value !== null && value !== undefined)
    status: string;
}
