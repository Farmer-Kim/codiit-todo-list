export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

export interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  type?: 'todo' | 'done';
  mode?: 'simple' | 'detail';
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  mode?: 'simple' | 'detail';
}

export interface TodoInputProps {
  onAddTodo: (text: string) => void;
} 