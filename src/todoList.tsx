/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import { TodoItem } from '@app/todoItem';

interface TodoListProps {
  todos: Todo[];
}

export class TodoList extends React.Component<TodoListProps> {
  render() {
    const { todos } = this.props;

    return (
      <React.Fragment>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </React.Fragment>
    );
  }
}
