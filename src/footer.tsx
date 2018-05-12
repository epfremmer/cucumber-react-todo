/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as classNames from 'classnames';
import * as pluralize from 'pluralize';
import { Link } from "react-router-dom";

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";

class TodoFooter extends React.Component<ITodoFooterProps, {}> {

  public render() {
    // @todo: change this out with redux location data
    const nowShowing = window.location.hash.replace('#/', '');
    const activeTodoWord = pluralize('item', this.props.count);
    let clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
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
        {clearButton}
      </footer>
    );
  }
}

export { TodoFooter };
