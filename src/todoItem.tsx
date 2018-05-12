/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { connect } from "react-redux";

import { ENTER_KEY, ESCAPE_KEY } from "@app/constants";
import { deleteTodo, toggleTodo, updateTodo } from "@app/actions";

interface TodoItemProps {
  key: string,
  todo: Todo;
}

interface TodoItemState {
  editText: string
  editing: boolean;
}

interface ConnectedStateProps { }
interface ConnectedDispatchProps {
  updateTodo: typeof updateTodo;
  deleteTodo: typeof deleteTodo;
  toggleTodo: typeof toggleTodo;
}

type TodoItemComonentProps = TodoItemProps & ConnectedStateProps & ConnectedDispatchProps;

class TodoItemComonent extends React.Component<TodoItemComonentProps, TodoItemState> {
  public state = {
    editText: this.props.todo.title,
    editing: false,
  };

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  public shouldComponentUpdate(nextProps: TodoItemComonentProps, nextState: TodoItemState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextState.editing !== this.state.editing ||
      nextState.editText !== this.state.editText
    );
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  public componentDidUpdate(prevProps: TodoItemComonentProps, prevState: TodoItemState) {
    if (!prevState.editing && this.state.editing) {
      const node = ReactDOM.findDOMNode(this.refs["editField"]) as HTMLInputElement;
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  public cancelEdit = () => {
    this.setState({ editing: false, editText: this.props.todo.title });
  };

  public editTodo = () => {
    this.setState({ editing: true, editText: this.props.todo.title });
  };

  public toggleTodo = () => {
    this.props.toggleTodo(this.props.todo);
  };

  public destroyTodo = () => {
    this.props.deleteTodo(this.props.todo);
  };

  public saveTodo = () => {
    const { editText: title } = this.state;

    this.props.updateTodo({ ...this.props.todo, title });
    this.setState({ editing: false, editText: title });
  };

  public handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ESCAPE_KEY) {
      this.cancelEdit();
    } else if (event.keyCode === ENTER_KEY) {
      this.saveTodo();
    }
  };

  public handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ editText: event.target.value });
  };

  public handleSubmit = (event: FormEvent<HTMLInputElement>) => {
    const val = this.state.editText.trim();

    return val ? this.saveTodo() : this.destroyTodo();
  };

  public render() {
    const { todo } = this.props;
    const { editing } = this.state;

    return (
      <li className={classNames({ completed: todo.completed, editing: editing })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.toggleTodo}
          />
          <label onDoubleClick={this.editTodo}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.destroyTodo} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {
  updateTodo,
  deleteTodo,
  toggleTodo
};

export const TodoItem = connect(mapStateToProps, mapDispatchToProps)(TodoItemComonent);
