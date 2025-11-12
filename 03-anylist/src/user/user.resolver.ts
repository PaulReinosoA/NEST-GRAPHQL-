import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'findAll' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findOneByEmail' })
  findOne(@Args('email', { type: () => String }) email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User, { name: 'block' })
  blockUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.block(id);
  }
}
