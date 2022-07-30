export interface UserDto {
  login: string;
  username?: string;
  avatar?: string;
  removedAvatar?: boolean;
  twoFactorAuth?: boolean;
}
