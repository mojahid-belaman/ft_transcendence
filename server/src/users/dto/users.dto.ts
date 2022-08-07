import { IsBoolean, IsDate, IsString, ValidateIf } from "class-validator";

export class CreateUserDto {
	@IsString()
	login: string;
	@IsString()
	@ValidateIf((object, value) => value !== null && value !== undefined)
	avatar: string;
}

export class UpdateUserDto {
	@IsString()
	username: string;
	@IsString()
	login: string;
	@IsString()
	@ValidateIf((object, value) => value !== null && value !== undefined)
	avatar: string;

}

export class FindUserResponsDto {
	@IsString()
	username: string;
	@IsString()
	login: string;
	@IsDate()
	lastConnected: Date;
	@IsString()
	@ValidateIf((object, value) => value !== null && value !== undefined)
	avatar: string;
	@IsBoolean()
	removedAvatar: boolean;
	@IsBoolean()
	twoFactorAuth: boolean;
}

