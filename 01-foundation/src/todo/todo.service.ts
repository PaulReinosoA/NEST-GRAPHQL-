import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';


@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Learn NestJS', done: false },
    { id: 2, description: 'Learn TypeScript', done: false },
    { id: 3, description: 'Learn GraphQL', done: true },
  ];

  create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      id: this.todos.length + 1,
      ...createTodoDto,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    this.findOne(id);
    const todosF = this.todos.filter((t) => t.id !== id);
    todosF.push({
      id,
      description: '',
      done: false,
      ...updateTodoDto,
    });
    this.todos = todosF;
    return this.findOne(id);
  }

  remove(id: number) {
    this.findOne(id);
    const todosF = this.todos.filter((t) => t.id !== id);
    this.todos = todosF;
    return { description: `el elemento ${id} ha sido eliminado` };
  }
}
