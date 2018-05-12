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
