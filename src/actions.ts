import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "@app/constants";

export type TodoFilterEnum = {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS
};

export const ADD_TODO = 'ADD_TODO';
export const addTodo = (todo: ITodo) => ({ type: ADD_TODO, todo });

export const UPDATE_TODO = 'UPDATE_TODO';
export const updateTodo = (todo: ITodo) => ({ type: UPDATE_TODO, todo });

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (todo: ITodo) => ({ type: DELETE_TODO, todo });

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = (todo: ITodo) => ({ type: TOGGLE_TODO, todo });

export const TOGGLE_ALL = 'TOGGLE_ALL';
export const toggleAll = (completed: boolean) => ({ type: TOGGLE_ALL, completed });

export const FETCH_TODOS = 'FETCH_TODOS';
export const fetchTodos = () => ({ type: FETCH_TODOS });

export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });

export const SET_TODO_FILTER = 'SET_TODO_FILTER';
export const setTodoFilter = (filter: TodoFilterEnum) => ({ type: SET_TODO_FILTER, filter });
