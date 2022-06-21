import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/users.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({type: UserLoginDto})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    delete req.user.userId
    return { ...req.user };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('check')
  Check(@Request() req) {
    return {
      statusCode: 200,
      role: req.user.role
    };
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.createUser(createUserDto)
    const jwt = await this.jwtService.signAsync(newUser);
    // await this.cacheManager.set('token', jwt);
    delete createUserDto.password;
    return {
      msg: 'success',
      access_token: jwt,
      ...createUserDto
    };
  }
}
