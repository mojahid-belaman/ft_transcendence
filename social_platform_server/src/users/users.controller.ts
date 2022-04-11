import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, FindUserResponsDto, UpdateUserDto, UserResponseDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService:UsersService){}
	@Get()
	getUsers():FindUserResponsDto[]{
		return(this.usersService.getUsers());
	}
	@Get("/:userId")
	getUserById(@Param('userId')userId:string):FindUserResponsDto{
		return(this.usersService.getUserById(userId));
	}
	@Post()
	createUser(@Body()body:CreateUserDto):FindUserResponsDto{
		return(this.usersService.createUser(body));
	}
	@Put("/:userId")
	updateUser(@Body() body:UpdateUserDto,@Param('userId') userId:string):FindUserResponsDto{
		return(this.usersService.updateUser(body,userId));
	}
}
