import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/AuthResponse.type';
import { SingUpInput, LoginInput } from './dto/inputs';

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

  // @Query(,{name:'revalidate'})
  // revalidateToken(){
  //   return this.authService.revalidateToken();
  // }
}
