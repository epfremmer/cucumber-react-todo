interface Todo {
  id: string,
  title: string,
  completed: boolean
}

interface ITodoItemProps {
  key: string,
  todo: Todo;
}

interface ITodoItemState {
  editText: string
  editing: boolean;
}
