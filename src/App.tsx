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

const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
let filteredTasks: Task[] = [];

switch (filter) {
  case "completed":
    filteredTasks = tasks.filter(task => task.completed);
    break;
  case "pending":
    filteredTasks = tasks.filter(task => !task.completed);
    break;
  default:
    filteredTasks = tasks;
}

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
      <div className='filter-buttons'>
        <button className={`filter-button ${filter === "all" ? "filter-button--active" : ""}`} onClick={() => setFilter("all")}>Todas</button>
        <button className={`filter-button ${filter === "completed" ? "filter-button--active" : ""}`} onClick={() => setFilter("completed")}>Completadas</button>
        <button className={`filter-button ${filter === "pending" ? "filter-button--active" : ""}`} onClick={() => setFilter("pending")}>Pendientes</button>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No hay tareas para mostrar</p>
      ) : (
        <TodoList 
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggleCompleted={toggleTask}
        />
      )}
      <br />
      <TodoForm
        onAddTask={createTask}
      />
    </div>
  )

}

export default App
