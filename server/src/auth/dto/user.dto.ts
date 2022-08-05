export interface UserDto {
  userId?: string;
  login: string;
  email?: string;
  username?: string;
  avatar?: string;
  changedAvatar?: boolean;
  isTwoFactorAuthEnabled?: boolean;
  isTwoFactorAuthenticated?: boolean;
  twoFactorAuthenticationSecret?: string;
}
