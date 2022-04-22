import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { HttpService } from '@nestjs/common';
import { map } from 'rxjs';

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
	async redirect(@Query() query, @Res() res) {
		let something;
		console.log('this is the query', query);
		await this.httpService
			.post('https://api.intra.42.fr/oauth/token', {
				grant_type: 'authorization_code',
				client_id: process.env.INTRA_CLIENT_ID,
				client_secret: process.env.INTRA_SECRET,
				code: query.code,
				redirect_uri: process.env.INTRA_CALLBACK_URL,
			})
			.pipe(map((response) => response.data))
			.subscribe((data) => {
				something = data;
			});
		console.log('this is the json file', something);
		return res.sendStatus(200);
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
