import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'list' })
export class List {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column()
  @IsString()
  name: string;

  @ManyToOne(() => User, (user) => user.list, { nullable: false, lazy: true})  
  @Index('userIdList-index')
  @Field(() => User)
  user: User;
}
