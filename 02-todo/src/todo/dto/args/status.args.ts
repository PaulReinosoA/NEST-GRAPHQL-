import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArgs {
  @Field(() => Boolean, { description: 'state of todo', nullable: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
