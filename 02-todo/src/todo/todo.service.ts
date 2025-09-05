import { Injectable, NotFoundException } from '@nestjs/common';

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
}
