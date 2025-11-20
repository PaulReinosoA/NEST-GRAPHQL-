import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthResponse } from './types/AuthResponse.type';
import { UserService } from 'src/user/user.service';
import { LoginInput, SingUpInput } from './dto/inputs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtservice: JwtService,
  ) {}

  private getJwttoken(userId: string) {
    return this.jwtservice.sign({ id: userId });
  }

  async signUp(singUpInput: SingUpInput): Promise<AuthResponse> {
    console.log(singUpInput);
    // todo crear usuario

    const user = await this.userService.create(singUpInput);

    // todo crear jwt
    const token = this.getJwttoken(user.id);

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
    const token = this.getJwttoken(user.id);

    return {
      token: token,
      user,
    };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOneById(id);

    if (!user.isActive)
      throw new UnauthorizedException('user is inactive, talk with an admin');

    delete user.password;
    return user;
  }
}
