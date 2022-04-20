import { Controller, Get, Res, Body, Post, Param } from '@nestjs/common';
import { Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppProvidersService } from './app-providers.service';
import { Cat } from './interfaces/cats.interface';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly appProviders: AppProvidersService,
	) {}

	@Get()
	welcome() {
		return 'Welcome page';
	}
	@Post('cats')
	async create(@Body() cat: Cat) {
		console.log(cat);
		this.appProviders.create(cat);
	}

	@Get('cats')
	findAll(): Observable<Cat[]> {
		return this.appProviders.findAll();
	}

	@Get('hello')
	getHello(): string {
		return this.appService.getHello();
	}

	// @Get('test')
	// getTest(@Res() response): string {
	//   response.status(200).send(`this is purely a test`);
	//   return `this is purely a test`;
	// }
	// @Get('redir')
	// @Redirect('https://nestjs.com', 301)
	// redirfunc(){
	//   console.log('hehe');
	//   return {url: 'google.com'};
	// }

	// @Get('anotherTest')
	// findAll(@Res() res: Response) {
	//   res.status(HttpStatus.OK).json([{name: 'khaoula'},{nickname: 'naboussi'}]);
	// }

	// @Get(':id')
	// PrintId(@Param() params): string{
	//   console.log('here', params);
	//     return `Printing the Id: ${params.id}`;
	// }

	// @Post()
	// create(): string {
	//   return 'This action adds a new cat';
	// }
	// @Get('hi')
	// find_All(): Observable<any[]> {
	//   return of(['hello world']);
	// }
}
