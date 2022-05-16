import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IntraAuthGuard extends AuthGuard('42') {
	async canActivate(context: ExecutionContext): Promise<any> {
		// const activate = [];
		const activate = (await super.canActivate(context)) as boolean;
		// const request = context.switchToHttp().getRequest();
		// await super.logIn(request);
		return activate;
	}
}
