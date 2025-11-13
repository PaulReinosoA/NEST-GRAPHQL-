import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthResponse } from './types/AuthResponse.type';
import { UserService } from 'src/user/user.service';
import { LoginInput, SingUpInput } from './dto/inputs';
import * as bcrypt from 'bcrypt';

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

    const { email, password } = loginInput;
    const user = await this.userService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    // todo crear jwt
    const token = 'ABC';

    return {
      token: token,
      user,
    };
  }
}
