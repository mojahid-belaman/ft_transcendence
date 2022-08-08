import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

const editfilename = (req, file, callback) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
    callback(
      null,
      Date.now() + '-' + req.user.username+ '.' + file.originalname,
    );
  }
  else
    return new BadRequestException();
};

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }


  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    const user = await this.usersService.getUserBylogin(req.user['login']);
    if (user)
      return user;
    return new NotFoundException();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAllUsers(@Req() req) {
    return await (this.usersService.getAll());
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Req() req) {
    return await (this.usersService.getUsers(req.user.userId));
  }
  
  @Get("/:userId")
  async getUserById(@Param('userId') userId: string) {
    return await (this.usersService.findOne({ id: userId }));
  }
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await (this.usersService.createUser(body));
  }

  @Post('/username')
  @UseGuards(JwtAuthGuard)
  async setUserName(@Req() req) {
    const regex = new RegExp('[a-z]+');
    if(regex.test(req.body.username))
      return await this.usersService.updateUsername(req.user['login'], req.body['username']);
    return new BadRequestException('You need to set a valid User name');
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("/")
  async updateUser(@Body() body: UpdateUserDto, @Req() req) {
    return await (this.usersService.updateUser(body, req.user.userId));
  }


  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'files',
        filename: editfilename,
      }),
    }),
  )
  @Post('/upload')
  async uploadAvatar(@Req() req, @UploadedFile() image: Express.Multer.File) {
    if (image) {
      const updateUser = await this.usersService.getUserBylogin(
        req.user['login'],
      );
      if (updateUser)
        return this.usersService.updateAvatarUrl(
          await updateUser,
          image['filename'],
        );
    }
    return new UnauthorizedException();
  }
}
