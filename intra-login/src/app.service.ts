import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	intraLogin(req) {
		if (!req.user) {
			return 'No user from intra';
		}

		return {
			message: 'User information from intra',
			user: req.user,
		};
	}
}
