import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';
import { AgregationType } from './types/agregations.type';

@Resolver(() => Todo) //es buena practica colocar el esquema aqui
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() StatusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(StatusArgs);
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
  //para asegurar el tipo de dato primario uso type
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    this.todoService.remove(id);
    return true;
  }

  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: 'pendingsTodos' })
  pendingsTodos(): number {
    return this.todoService.pendingsTodos;
  }

  @Query(() => AgregationType)
  agregation(): AgregationType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingsTodos,
      total: this.todoService.totalTodos,
    };
  }

  @Query(() => Int, { name: 'totalTodos',deprecationReason:'this method is deficient, must be use another' })
  totalOldTodos(): number {
    return this.todoService.totalTodos;
  }
}
