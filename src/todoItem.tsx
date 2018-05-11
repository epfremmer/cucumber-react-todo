/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { connect } from "react-redux";

import { ENTER_KEY, ESCAPE_KEY } from "@app/constants";
import { deleteTodo, toggleTodo, updateTodo } from "@app/actions";

interface ConnectedStateProps { }
interface ConnectedDispatchProps {
  updateTodo: typeof updateTodo;
  deleteTodo: typeof deleteTodo;
  toggleTodo: typeof toggleTodo;
}

type TodoItemComonentProps = ITodoItemProps & ConnectedStateProps & ConnectedDispatchProps;

class TodoItemComonent extends React.Component<TodoItemComonentProps, ITodoItemState> {
  public state = {
    editText: this.props.todo.title,
    editing: false,
  };

  public cancel() {
    this.setState({ editing: false, editText: this.props.todo.title });
  }

  public edit(todo: ITodo) {
    this.setState({ editing: true, editText: this.props.todo.title });
  }

  public toggle(todo : ITodo) {
    this.props.toggleTodo(todo);
  }

  public destroy(todo: ITodo) {
    this.props.deleteTodo(todo);
  }

  public save(todo: ITodo, title: string) {
    this.props.updateTodo({ ...todo, title });
    this.setState({ editing: false, editText: title });
  }

  public handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ESCAPE_KEY) {
      this.cancel();
    } else if (event.keyCode === ENTER_KEY) {
      this.save(this.props.todo, this.state.editText);
    }
  };

  public handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    this.setState({ editText: input.value });
  };

  public handleSubmit = (event: FormEvent<HTMLInputElement>) => {
    const val = this.state.editText.trim();
    if (val) {
      this.save(this.props.todo, this.state.editText);
    } else {
      this.destroy(this.props.todo);
    }
  };

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState) {
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
  public componentDidUpdate(prevProps: ITodoItemProps, prevState: ITodoItemState) {
    if (!prevState.editing && this.state.editing) {
      const node = ReactDOM.findDOMNode(this.refs["editField"]) as HTMLInputElement;
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  public render() {
    return (
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.state.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={() => this.toggle(this.props.todo)}
          />
          <label onDoubleClick={() => this.edit(this.props.todo)}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={() => this.destroy(this.props.todo)} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={ e => this.handleSubmit(e) }
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
