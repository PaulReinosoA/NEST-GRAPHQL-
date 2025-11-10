import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class SingUpInput {
  @Field(() => String) // por defecto obligatorio
  @IsEmail()
  email: string;

  @Field(() => String) // por defecto obligatorio
  @IsNotEmpty()
  fullname: string;

  @Field(() => String) // por defecto obligatorio
  @MinLength(3)
  password: string;
}
