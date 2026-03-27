import { useEffect, useState } from 'react';
import './App.css'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import type { Task } from './types/Task';

function App() {

const [tasks, setTasks] = useState<Task[]>(() => {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    return JSON.parse(storedTasks);
  }

  return [
    { id: 1, text: "Aprender React", completed: false },
    { id: 2, text: "Hacer TODO App", completed: true }
  ];
});

  //Guardar tareas en localStorage cada vez que se actualizan
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Crear nueva tarea
  const createTask = (text: string) => {
    if (text.trim() === "") return; //Evitamos tareas vacias

    const newTask: Task = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    setTasks(prev => [...prev, newTask]);

  }
  //Borrar una tarea
  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter((task) => task.id !== id));
  }

  //Actualizar estado de una tarea
  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <div>
      <h1>Mi TODO App</h1>
      <TodoList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleCompleted={toggleTask}
      />
      <br />
      <TodoForm
        onAddTask={createTask}
      />
    </div>
  )

}

export default App
