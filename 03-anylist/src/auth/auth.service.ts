import { Injectable } from '@nestjs/common';
import { AuthResponse } from './types/AuthResponse.type';
import { UserService } from 'src/user/user.service';
import { LoginInput, SingUpInput } from './dto/inputs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(singUpInput: SingUpInput): Promise<AuthResponse> {
    console.log(singUpInput);
    // todo crear usuario

    const user = await this.userService.create(singUpInput);

    // todo crear jwt
    const token = 'ABC';

    return {
      token: token,
      user,
    };
  }

  async logIn(loginInput: LoginInput): Promise<AuthResponse> {
    console.log(loginInput);
    // todo buscar usuario

    const { email } = loginInput;
    const user = await this.userService.findOneByEmail(email);

    // todo crear jwt
    const token = 'ABC';

    return {
      token: token,
      user,
    };
  }
}
