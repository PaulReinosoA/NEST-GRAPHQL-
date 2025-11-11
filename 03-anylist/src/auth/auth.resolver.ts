import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/AuthResponse.type';
import { SingUpInput } from './dto/inputs/singup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  signUp(@Args('singUpInput') singUpInput: SingUpInput): Promise<AuthResponse> {
    return this.authService.signUp(singUpInput);
  }

  // @Mutation(,{name:'logIn'})
  // logIn(){
  //     return this.authService.logIn();
  // }

  // @Query(,{name:'revalidate'})
  // revalidateToken(){
  //   return this.authService.revalidateToken();
  // }
}
