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

interface IAppProps {
  // model : ITodoModel;
}

interface IAppState {
  // editing? : string;
}
