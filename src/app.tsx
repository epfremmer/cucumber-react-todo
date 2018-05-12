/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Uuid from 'uuid';
import { Route, Switch } from "react-router";
import { KeyboardEvent, FormEvent } from 'react';
import { connect } from "react-redux";

import { TodoFooter } from "@app/footer";
import { TodoItem } from "@app/todoItem";
import { ENTER_KEY } from "@app/constants";
import { addTodo, clearCompleted, deleteTodo, toggleAll, toggleTodo, updateTodo } from "@app/actions";

interface ConnectedStateProps {
  todos: ITodo[];
}

interface ConnectedDispatchProps {
  addTodo: typeof addTodo;
  toggleAll: typeof toggleAll;
  clearCompleted: typeof clearCompleted;
}

type TodoAppComponentProps = IAppProps & ConnectedStateProps & ConnectedDispatchProps;

class TodoAppComponent extends React.Component<TodoAppComponentProps, IAppState> {
  public handleNewTodoKeyDown(event : KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = (ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement).value.trim();

    if (val) {
      const todo = { id: Uuid.v4(), title: val, completed: false };
      this.props.addTodo(todo);
      (ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement).value = '';
    }
  }

  public toggleAll(event : FormEvent<HTMLInputElement>) {
    const target: any = event.target;
    const checked = target.checked;
    this.props.toggleAll(checked);
  }

  public clearCompleted() {
    this.props.clearCompleted();
  }

  private renderTodos(todos: ITodo[]) {
    return todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ));
  }

  public render() {
    const { todos } = this.props;
    let footer, main;

    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    const activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          onClearCompleted={ e=> this.clearCompleted() }
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={ e => this.toggleAll(e) }
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
          <ul className="todo-list">
            <Switch>
              <Route exact path="/" render={() => this.renderTodos(todos)} />
              <Route path="/active" render={() => this.renderTodos(todos.filter(todo => !todo.completed))} />
              <Route path="/completed" render={() => this.renderTodos(todos.filter(todo => todo.completed))} />
            </Switch>
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            ref="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={ e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({ todos });
const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  toggleAll,
  clearCompleted,
};

export const TodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoAppComponent);
