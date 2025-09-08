import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'todo Quick agregation' })
export class AgregationType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;
}
