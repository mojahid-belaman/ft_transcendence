import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ok } from 'assert';
import { response } from 'express';

@Controller('oauth')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly httpService: HttpService,
	) {}

	/**
	 * /api/ /home/login
	 * this is the route for authentication
	 */

	@Get('login')
	@UseGuards(IntraAuthGuard)
	async login() {
		return;
	}

	@Get()
	async redirect(@Query() query) {
		console.log('this is the query', query);
		let something: {};
		console.log(
			this.httpService
				.post('https://api.intra.42.fr/oauth/token', {
					grant_type: 'authorization_code',
					client_id: process.env.INTRA_CLIENT_ID,
					client_secret: process.env.INTRA_SECRET,
					code: query.code,
					redirect_uri: process.env.INTRA_CALLBACK_URL,
				})
				.subscribe((response) => {
					// something = response.data;
					something = response.data;
					console.log('the first something: ', something);
					console.log('the response data: ', response.data);
				}),
		);
		await console.log(something);
		return;
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
