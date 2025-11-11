import { Injectable } from '@nestjs/common';
import { AuthResponse } from './types/AuthResponse.type';
import { SingUpInput } from './dto/inputs/singup.input';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor() {}

  async signUp(singUpInput: SingUpInput): Promise<AuthResponse> {
    console.log(singUpInput);
    return {
      token: 'some-jwt-token',
      user: new User(),
    };
  }
}
