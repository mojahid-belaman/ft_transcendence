import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, FindUserResponsDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService:UsersService){}
	@Get()
	getUsers(){
		return(this.usersService.getUsers());
	}
	@Get("/:userId")
	getUserById(@Param('userId')userId:string){
		console.log(userId)
		return(this.usersService.findOne({ id: userId }));
	}
	@Post()
	createUser(@Body()body:CreateUserDto){
		return(this.usersService.createUser(body));
	}
	@Put("/:userId")
	updateUser(@Body() body:UpdateUserDto,@Param('userId') userId:string){
		return(this.usersService.updateUser(body,userId));
	}
}
