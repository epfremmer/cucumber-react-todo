/// <reference path="./interfaces.d.ts"/>

import * as React from 'react';
import * as classNames from 'classnames';
import * as pluralize from 'pluralize';
import { Link } from 'react-router-dom';
import { RouterState } from 'react-router-redux';
import { connect } from 'react-redux';

import { clearCompleted } from '@app/actions';

interface ConnectedStateProps {
  activeCount: number;
  completedCount: number;
  location: RouterState['location'];
}

interface ConnectedDispatchProps {
  clearCompleted: typeof clearCompleted;
}

type TodoFooterComponentProps = ConnectedStateProps & ConnectedDispatchProps;

class TodoFooterComponent extends React.Component<TodoFooterComponentProps> {

  private clearCompleted = () => this.props.clearCompleted();

  public render() {
    const { activeCount, completedCount, location } = this.props;
    const nowShowing = location ? location.pathname : null;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong>
          <span> {pluralize('item', activeCount)} left</span>
        </span>
        <ul className="filters">
          <li>
            <Link to="/" className={classNames({selected: nowShowing === '/'})}>All</Link>
          </li>
          <span>{' '}</span>
          <li>
            <Link to="/active" className={classNames({selected: nowShowing === '/active'})}>Active</Link>
          </li>
          <span>{' '}</span>
          <li>
            <Link to="/completed" className={classNames({selected: nowShowing === '/completed'})}>Completed</Link>
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

const mapStateToProps = ({ todos, routing }) => ({
  activeCount: todos.filter(todo => !todo.completed).length,
  completedCount: todos.filter(todo => todo.completed).length,
  location: routing.location
});

const mapDispatchToProps = {
  clearCompleted,
};

export const TodoFooter = connect(mapStateToProps, mapDispatchToProps)(TodoFooterComponent);
