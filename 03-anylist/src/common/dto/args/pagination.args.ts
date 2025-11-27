import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  @IsOptional()
  @Min(0)
  offset: number;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @IsOptional()
  @Min(1)
  limit: number;
}
