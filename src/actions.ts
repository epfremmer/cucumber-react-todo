export const ADD_TODO = 'ADD_TODO';
export const addTodo = (todo: Todo) => ({ type: ADD_TODO, todo });

export const UPDATE_TODO = 'UPDATE_TODO';
export const updateTodo = (todo: Todo) => ({ type: UPDATE_TODO, todo });

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (todo: Todo) => ({ type: DELETE_TODO, todo });

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = (todo: Todo) => ({ type: TOGGLE_TODO, todo });

export const TOGGLE_ALL = 'TOGGLE_ALL';
export const toggleAll = (completed: boolean) => ({ type: TOGGLE_ALL, completed });

export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });
