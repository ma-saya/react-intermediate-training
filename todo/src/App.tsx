import { useState } from 'react';
import  type{ Todo } from './types/todo';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <h1>Todo List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList
      todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  )
}