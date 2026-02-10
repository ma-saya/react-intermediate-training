import { useState } from 'react';
import { HabitForm } from './HabitForm';
import { HabitList } from './HabitList';
import type { Habit } from './types/habit';

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: '読書', count: 0 },
    { id: 2, name: '運動', count: 0 },
    { id: 3, name: '瞑想', count: 0 },
  ]);

  const handleAdd = (name: string) => {
    const newHabit: Habit = {
      id: Date.now(),
      name,
      count: 0,
    };
    setHabits([...habits, newHabit]);
  };

  const handleIncrement = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, count: habit.count + 1 } : habit
      )
    );
  };

  const handleDecrement = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, count: Math.max(0, habit.count - 1) } : habit
      )
    );
  };

  const handleDelete = (id: number) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>習慣トラッカー</h1>

      <HabitForm onAdd={handleAdd} />

      <HabitList
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
      />
    </div>
  );
}