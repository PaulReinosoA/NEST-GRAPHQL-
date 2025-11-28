import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/lists/entities/list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  fullName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  //@Field(()=>String) // este comentario hace que no me retorne el dato en el endpoint
  password: string;

  @Column({ type: 'text', array: true, default: ['user'] })
  @Field(() => [String])
  roles: string[];

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  //TODO: relaciones
  @ManyToOne(() => User, (user) => user.lastUpdateBy, {
    nullable: true,
    //eager: true, //con excepcion de querybuilder en las demas carga relacion automatica!
    lazy: true, //con esto si carga automaticamente!
  })
  @JoinColumn({ name: 'lasUpdateBy' })
  @Field(() => User, { nullable: true })
  lastUpdateBy?: User;


  @OneToMany(() => Item, (item) => item.user, { lazy: true })
  @Field(() => [Item])
  items: Item[];


  @OneToMany(() => List, (list) => list.user, { lazy: true })
  @Field(() => [List])
  list: List[];
}
