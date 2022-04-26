import { IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateConnectionDto {
    @IsUUID()
    user: string;
    @IsUUID()
    channel: string;
    @IsString()
    @ValidateIf((object, value) => value !== null && value !== undefined)
    status: string;
}
