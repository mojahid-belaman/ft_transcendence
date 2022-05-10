import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IntraAuthService {
  constructor(private readonly httpService: HttpService) {}
  async getAccessToken(query: any): Promise<any> {
    return firstValueFrom(
      this.httpService.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.INTRA_CLIENT_ID,
        client_secret: process.env.INTRA_SECRET,
        code: query.code,
        redirect_uri: process.env.INTRA_CALLBACK_URL,
      }),
    );
  }
}
