import {
  Controller,
  Delete,
  Get,
  Req,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

@Controller("auth")
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Get('isAuthorized')
  isAuthorized(@Request() req) {
    return req.user;
  }

}
