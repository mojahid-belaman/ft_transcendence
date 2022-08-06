import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
    callback(
      new HttpException('Bad file extension!', HttpStatus.BAD_REQUEST),
      false,
      );
  }
  else
    callback(
      null,
      Date.now() + '-' + req.user.username+ '.' + file.originalname,
    );
};

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }


  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    const user = await this.usersService.getUserBylogin(req.user['login']);
    if (user) return user;
    return { error: 'user not found' };
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
   return await this.usersService.updateUsername(req.user['login'], req.body['username']);
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
    console.log(req.body);
    if (image) {
      const updateUser = await this.usersService.getUserBylogin(
        req.user['login'],
      );
      console.log(image);
      if (updateUser)
        return this.usersService.updateAvatarUrl(
          await updateUser,
          image['filename'],
        );
    }
    throw new UnauthorizedException();
  }
}
