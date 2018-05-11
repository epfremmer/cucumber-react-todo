interface ITodo {
  id: string,
  title: string,
  completed: boolean
}

interface ITodoItemProps {
  key: string,
  todo: ITodo;
}

interface ITodoItemState {
  editText: string
  editing: boolean;
}

interface ITodoFooterProps {
  completedCount : number;
  onClearCompleted : any;
  count : number;
}


interface ITodoModel {
  key : any;
  todos : Array<ITodo>;
  onChanges : Array<any>;
  subscribe(onChange);
  inform();
  addTodo(title : string);
  toggleAll(checked);
  toggle(todoToToggle);
  destroy(todo);
  save(todoToSave, text);
  clearCompleted();
}

interface IAppProps {
  // model : ITodoModel;
}

interface IAppState {
  // editing? : string;
}
