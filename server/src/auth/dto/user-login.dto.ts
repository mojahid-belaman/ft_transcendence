import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()

  readonly password: string;
}