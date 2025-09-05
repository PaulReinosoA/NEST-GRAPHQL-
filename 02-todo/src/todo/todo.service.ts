import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Injectable()
export class TodoService {
  private todos = [
    { id: 1, description: 'A', done: true },
    { id: 2, description: 'B', done: true },
    { id: 3, description: 'A', done: true },
  ];

  public findAll = () => {
    return this.todos;
  };

  public findOne = (id: number) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  };

  public create = (createTodoInput: CreateTodoInput): Todo => {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(todo);
    return todo;
  };

  public update = (updateTodoInput: UpdateTodoInput): Todo => {
    const { id, description, done } = updateTodoInput;
    const todoUpdated = this.findOne(id);

    if (description) todoUpdated.description = description;
    if (done !== undefined) todoUpdated.done = done;

    this.todos.map((todo) => {
      if (todo.id === id) {
        return todoUpdated;
      }
      return todo;
    });

    return todoUpdated;
  };

  public remove = (id: number) => {
    this.findOne(id);

    this.todos = this.todos.filter((todo) => {
      if (todo.id !== id) {
        return todo;
      }
    });

    return true;
  };
}
