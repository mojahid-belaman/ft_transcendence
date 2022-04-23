import { IsDate, IsString, ValidateIf } from "class-validator";

export class CreateUserDto{
	@IsString()
	username:string;
	@IsString()
	password:string;
	@IsString()
	@ValidateIf((object, value) => value !== null && value !== undefined)
	avatar:string;
}

export class UpdateUserDto {
	@IsString()
	username:string;
	@IsString()
	password:string;
	@IsString()
	@ValidateIf((object, value) => value !== null && value !== undefined)
	avatar:string;	
}

export class FindUserResponsDto {
	@IsString()
	username:string;
	@IsDate()
    lastConnected: Date;
	@IsString()
	@ValidateIf((object, value) => value !== null && value !== undefined)
	avatar:string;	
}

