import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

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

  @Query(() => Int, { name: 'randomZeroToTen', description: 'Retorna un numero randomico entre 0 y el numero que le pasemos' })
  // El query recibe argumento de tipo INT -Opcional y por defecto es 6 y retorna un numero randomico entre 0 y el numero que le pasemos
  getRandomZeroToTen(@Args('to', { nullable: true, type: () => Int }) to: number = 6): number {
    return Math.floor(Math.random() * to); // entero randomico de 0 - 9
  }
}
