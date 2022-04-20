import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { config } from 'dotenv';
import verify from 'passport-42';

config();

@Injectable()
export class fourtyTwoStrategy extends PassportStrategy(Strategy, '42') {
	constructor() {
		super({
			clientID: process.env.FT_CLIENT_ID,
			clientSecret: process.env.FT_SECRET,
			callbackURL: process.env.FT_CALLBACK_URL,
			scope: ['profile'],
		});
	}
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: verify,
	): Promise<any> {
		const { name, id } = profile;
		const user = {
			name: name.givenName,
			id: id,
			accessToken,
		};
		done(null, user);
	}
}
