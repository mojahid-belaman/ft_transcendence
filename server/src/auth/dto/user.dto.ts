import { IsString, Matches } from "class-validator";

export class UserDto {
  id: number;
  login: string;
  email?: string;
  // @IsString()
  username?: string;
  // @IsString()
  avatar?: string;
  changedAvatar?: boolean;
  isTwoFactorAuthEnabled?: boolean;
  isTwoFactorAuthenticated?: boolean;
  twoFactorAuthenticationSecret?: string;
}

export class UserValidateDTO {
  @Matches('[a-z0-9\-]+') // comes from class-validator
  username: string;
}
