import { AnyAction } from 'redux';
import * as Actions from '@app/actions';
import todoProvider from '@app/todoProvider';

export const todos = (state: Todo[] = todoProvider.fetchTodos(), action: AnyAction) => {
  switch (action.type) {
    case Actions.ADD_TODO:
      todoProvider.saveTodo(action.todo);
      return todoProvider.fetchTodos();
    case Actions.UPDATE_TODO:
      todoProvider.updateTodo(action.todo);
      return todoProvider.fetchTodos();
    case Actions.DELETE_TODO:
      todoProvider.removeTodo(action.todo);
      return todoProvider.fetchTodos();
    case Actions.TOGGLE_TODO:
      todoProvider.toggleTodo(action.todo);
      return todoProvider.fetchTodos();
    case Actions.TOGGLE_ALL:
      todoProvider.toggleAll(action.completed);
      return todoProvider.fetchTodos();
    case Actions.CLEAR_COMPLETED:
      todoProvider.clearCompleted();
      return todoProvider.fetchTodos();
    default:
      return state;
  }
};
