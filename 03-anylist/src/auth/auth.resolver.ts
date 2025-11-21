import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/AuthResponse.type';
import { SingUpInput, LoginInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ValidRoles } from './enums/valid-roles.enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  signUp(@Args('singUpInput') singUpInput: SingUpInput): Promise<AuthResponse> {
    return this.authService.signUp(singUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'logIn' })
  logIn(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.logIn(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser([ValidRoles.admin]) user: User): AuthResponse {
    //console.log('revalidate token ', user);
    return this.authService.revalidateToken(user);
  }
}
