import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/AuthResponse.type';
import { SingUpInput, LoginInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  revalidateToken(): AuthResponse {
    //return this.authService.revalidateToken();
    throw new Error('no implementado');
  }
}
