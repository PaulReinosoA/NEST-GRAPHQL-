import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String) // por defecto obligatorio
  @IsEmail()
  email: string;

  @Field(() => String) // por defecto obligatorio
  @IsNotEmpty()
  fullName: string;

  @Field(() => String) // por defecto obligatorio
  @MinLength(3)
  password: string;
}
