import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Resolver(() => Todo) //es buena practica colocar el esquema aqui
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo', description: 'Obtiene un todo por ID' })
  findOne(@Args('id', { nullable: true, type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('CreateTodoInput') createTodoInput: CreateTodoInput) {
    console.log({ createTodoInput });
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  //para asegurar el tipo de dato primario useo type
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    this.todoService.remove(id);
    return true;
  }
}
