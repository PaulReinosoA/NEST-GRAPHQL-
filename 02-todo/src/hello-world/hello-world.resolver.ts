import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  //     # Query => @nestjs/graphql
  // # [Pet] = Arreglo de mascotas
  @Query(() => String)
  helloWordl(): string {
    return 'hola m'; // lógica
  }
}
