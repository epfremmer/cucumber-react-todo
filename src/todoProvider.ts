const STORAGE_KEY = 'react-todos';

export default new class TodoProvider {
  get todos() {
    return this.load()
  }

  fetchTodos(): Todo[] {
    return this.todos;
  }

  saveTodo(todo: Todo) {
    this.persist([...this.todos, todo]);
  }

  updateTodo(todo: Todo) {
    this.persist(this.todos.map(item => item.id === todo.id ? todo : item));
  }

  removeTodo(todo: Todo) {
    this.persist(this.todos.filter(item => item.id !== todo.id));
  }

  toggleTodo(todo: Todo) {
    this.updateTodo({...todo, completed: !todo.completed});
  }

  toggleAll(completed: boolean) {
    this.persist(this.todos.map(todo => ({ ...todo, completed })));
  }

  clearCompleted() {
    this.persist(this.todos.filter(todo => !todo.completed));
  }

  private load() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  }

  private persist(todos: Todo[] = []) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
