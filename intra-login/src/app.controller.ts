import {
	Controller,
	Get,
	Post,
	Param,
	Query,
	Redirect,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { query, Response } from 'express';
import { Body, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Controller('oauth')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly httpService: HttpService,
	) {}

	// @Post()
	// authenticate(
	// 	@Body() authorizationRequestDto: AuthorizationRequestDto,
	// 	@Query() query,
	// ): Observable<any> {
	// 	return this.httpService
	// 		.post('https://api.intra.42.fr/oauth/token', {
	// 			grant_type: 'authorization_code',
	// 			client_id: process.env.FT_CLIENT_ID,
	// 			client_secret: process.env.FT_SECRET,
	// 			code: query.code,
	// 			redirect_uri: 'http://localhost:3000/home',
	// 		})
	// 		.pipe(map((response) => response.data));
	// }

	/**
	 * /api/ /home/login
	 * this is the route for authentication
	 */

	@Get('login')
	@UseGuards(IntraAuthGuard)
	async login(@Req() req) {
		return;
	}

	/**
	 * /api/ /home/redirect
	 * this is the redirect url the oauth2 provider will call
	 */

	@Get()
	redirect(@Query() query) {
		console.log('this is the query', query);
		return this.httpService
			.post('https://api.intra.42.fr/oauth/token', {
				grant_type: 'authorization_code',
				client_id: process.env.FT_CLIENT_ID,
				client_secret: process.env.FT_SECRET,
				code: query.code,
				redirect_uri: process.env.FT_CALLBACK_URL,
			})
			.pipe(
				map((response) => {
					return response.data;
				}),
			);
	}

	/**
	 * /api/ /home/status
	 * retrieve the status auth
	 */

	@Get('home')
	home(@Req() req) {
		return this.appService.intraLogin(req);
	}
}
