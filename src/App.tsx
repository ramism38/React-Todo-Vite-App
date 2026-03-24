import { useState } from 'react';
import './App.css'

function App() {

  type Task = {
    id: number,
    text: string,
    completed: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Aprender React", completed: false },
    { id: 2, text: "Hacer TODO App", completed: true }
  ]);

  return (
    <div>
      <ul>{tasks.map((task) => (
        <li key={task.id}>Tarea nº {task.id} con nombre: {task.text} en estado: {task.completed ? "Completada" : "Pendiente"} </li>
      ))}
      </ul>
    </div>
  )

}

export default App
