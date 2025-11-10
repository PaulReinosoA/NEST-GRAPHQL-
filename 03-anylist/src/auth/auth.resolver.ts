import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(,{name:'singUp'})
  singUp(){
      return this.authService.singUp();
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
