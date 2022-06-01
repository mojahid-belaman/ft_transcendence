import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return (this.usersService.getUsers());
  }
  @Get("/:userId")
  getUserById(@Param('userId') userId: string) {
    return (this.usersService.findOne({ id: userId }));
  }
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return (this.usersService.createUser(body));
  }
  @UseGuards(JwtAuthGuard)
  @Put("/")
  updateUser(@Body() body: UpdateUserDto, @Req() req) {
    return (this.usersService.updateUser(body, req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/upload-avatar')
  uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

}
