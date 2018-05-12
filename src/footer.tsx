/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as classNames from 'classnames';
import * as pluralize from 'pluralize';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import { clearCompleted } from "@app/actions";

interface ConnectedStateProps {
  activeCount: number;
  completedCount: number;
}

interface ConnectedDispatchProps {
  clearCompleted: typeof clearCompleted;
}

type TodoFooterComponentProps = ConnectedStateProps & ConnectedDispatchProps;

class TodoFooterComponent extends React.Component<TodoFooterComponentProps> {

  private clearCompleted = () => this.props.clearCompleted();

  public render() {
    const { activeCount, completedCount } = this.props;
    // @todo: change this out with redux location data
    const nowShowing = window.location.hash.replace('#/', '');

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong>
          <span> {pluralize('item', activeCount)} left</span>
        </span>
        <ul className="filters">
          <li>
            <Link to="/" className={classNames({selected: nowShowing === ALL_TODOS})}>All</Link>
          </li>
          <span>{' '}</span>
          <li>
            <Link to="/active" className={classNames({selected: nowShowing === ACTIVE_TODOS})}>Active</Link>
          </li>
          <span>{' '}</span>
          <li>
            <Link to="/completed" className={classNames({selected: nowShowing === COMPLETED_TODOS})}>Completed</Link>
          </li>
        </ul>
        {completedCount > 0 &&
          <button className="clear-completed" onClick={this.clearCompleted}>
            Clear completed
          </button>
        }
      </footer>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  activeCount: todos.filter(todo => !todo.completed).length,
  completedCount: todos.filter(todo => todo.completed).length
});

const mapDispatchToProps = {
  clearCompleted
};

export const TodoFooter = connect(mapStateToProps, mapDispatchToProps)(TodoFooterComponent);
