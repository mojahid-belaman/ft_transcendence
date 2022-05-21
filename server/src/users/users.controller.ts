import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/custom-decorators/role.decorators';
import { Role } from 'src/enums/role.enum';
import {
  CreateUserDto,
  FindUserResponsDto,
  UpdateUserDto,
} from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get('/:userId')
  getUserById(@Param('userId') userId: string) {
    return this.usersService.findOne({ id: userId });
  }
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
  @Put('/:userId')
  updateUser(@Body() body: UpdateUserDto, @Param('userId') userId: string) {
    return this.usersService.updateUser(body, userId);
  }
}
