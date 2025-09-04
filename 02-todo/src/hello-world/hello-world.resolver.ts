import { Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: 'hello' })
  helloWordl(): string {
    return 'hola mundo'; // lógica
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: 'randomZeroToTen' })
  getRandomZeroToTen(): number {
    return Math.floor(Math.random() * 10); // entereo randomico de 0 - 9
  }
}
