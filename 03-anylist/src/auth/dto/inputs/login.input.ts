import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String) // por defecto obligatorio
  @IsEmail()
  email: string;

  @Field(() => String) // por defecto obligatorio
  @MinLength(3)
  password: string;
}
