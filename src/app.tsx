/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as Uuid from 'uuid';
import { Route, Switch } from 'react-router';
import { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';

import { TodoFooter } from '@app/footer';
import { TodoList } from '@app/todoList';
import { addTodo, deleteTodo, toggleAll, toggleTodo, updateTodo } from '@app/actions';

interface TodoAppState {
  newTodoTitle: string;
}

interface ConnectedStateProps {
  todos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
}

interface ConnectedDispatchProps {
  addTodo: typeof addTodo;
  toggleAll: typeof toggleAll;
}

type TodoAppComponentProps = ConnectedStateProps & ConnectedDispatchProps;

class TodoAppComponent extends React.Component<TodoAppComponentProps, TodoAppState> {
  public state = {
    newTodoTitle: ''
  };

  public onNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    this.setState({ newTodoTitle: title })
  };

  public onNewTodoSubmit = (event: FormEvent<HTMLFormElement>) => {
    const title = this.state.newTodoTitle;
    const todo = { id: Uuid.v4(), title: title, completed: false };

    if (todo.title) {
      this.props.addTodo(todo);
      this.setState({ newTodoTitle: '' });
    }
  };

  public toggleAll = (event : ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const checked = target.checked;

    this.props.toggleAll(checked);
  };

  public render() {
    const { todos, activeTodos, completedTodos } = this.props;
    const { newTodoTitle } = this.state;

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.onNewTodoSubmit}>
            <input
              ref="newField"
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.onNewTodoChange}
              value={newTodoTitle}
              autoFocus={true}
            />
          </form>
        </header>
        {Boolean(todos.length) &&
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={this.toggleAll}
              checked={activeTodos.length === 0}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
            <ul className="todo-list">
              <Switch>
                <Route exact path="/" render={() => <TodoList todos={todos} />} />
                <Route path="/active" render={() => <TodoList todos={activeTodos} />} />
                <Route path="/completed" render={() => <TodoList todos={completedTodos} />} />
              </Switch>
            </ul>
          </section>
        }
        {Boolean(todos.length) && <TodoFooter />}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos: todos,
  activeTodos: todos.filter(todo => !todo.completed),
  completedTodos: todos.filter(todo => todo.completed),
});

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  toggleAll,
};

export const TodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoAppComponent);
