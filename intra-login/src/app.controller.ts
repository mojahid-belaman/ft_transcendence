import {
	Controller,
	Get,
	Query,
	Req,
	Res,
	UseGuards,
	HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { HttpService } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserDataService } from './Services/userData.service';

@Controller('oauth')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly httpService: HttpService,
		private readonly userDataService: UserDataService,
	) {}

	/**
	 * /api/ /home/login
	 * this is the route for authentication
	 */
	userData: {};
	accessToken: {};

	@Get('login')
	@UseGuards(IntraAuthGuard)
	async login() {
		return;
	}

	@Get()
	async redirect(@Query() query, @Res() res) {
		this.accessToken = await this.userDataService
			.getAccessToken(query)
			.then((resolve) => resolve.data)
			.catch((error) => console.log(error));
		this.userData = await firstValueFrom(
			this.httpService.get('https://api.intra.42.fr/v2/me', {
				headers: {
					Authorization: `bearer ${this.accessToken['access_token']}`,
				},
			}),
		)
			.then((resolve) => resolve.data)
			.catch((error) => {
				console.log(error);
			});
		return res.status(HttpStatus.OK).json({ user: this.userData });
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
