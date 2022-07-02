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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';

const editfilename = (req, file, callback) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/))
    callback(
      new HttpException('Bad file extension!', HttpStatus.BAD_REQUEST),
      false,
    );
  else
    callback(
      null,
      Date.now() + '-' + req.user.username42 + '.' + file.originalname,
    );
};

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("/")
  async updateUser(@Body() body: UpdateUserDto, @Req() req) {
    return await (this.usersService.updateUser(body, req.user.userId));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'files',
        filename: editfilename,
      }),
    }),
  )
  @Post('/upload-avatar')
  async uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return this.usersService.findOne({ id: req.user.userId }).then(async (data) => {
      if (!data) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      return await this.usersService.updateUser(
        { ...data, avatar: file.filename },
        req.userId,
      );
    });
  }
}
