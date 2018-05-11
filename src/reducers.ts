import { AnyAction, combineReducers } from 'redux';
import * as Actions from "@app/actions";
import todoProvider from '@app/todoProvider';
import { ALL_TODOS } from "@app/constants";

const todos = (state: ITodo[] = [], action: AnyAction) => {
  switch (action.type) {
    case Actions.FETCH_TODOS:
      return todoProvider.fetchTodos();
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

const filter = (state = ALL_TODOS, action: AnyAction) => {
  switch (action.type) {
    case Actions.SET_TODO_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  todos,
  filter
});
