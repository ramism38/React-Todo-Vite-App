import { useState } from 'react';
import './App.css'

function App() {

  //Tipo de tarea (Declaramos como sera el objeto)
  type Task = {
    id: number,
    text: string,
    completed: boolean;
  }

  //Declaracion del array de tareas
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Aprender React", completed: false },
    { id: 2, text: "Hacer TODO App", completed: true }
  ]);

  //Input controlado
  const [taskName, setTaskName] = useState("");

  //Actualizar input cuando el usuario escribe
  const updateTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  }

  //Crear nueva tarea
  const createTask = () => {
    if (taskName.trim() === "") return; //Evitamos tareas vacias

    //Generar nuevo ID con condiciones
    let newId = 0;
    if (tasks.length != 0) {
      newId = tasks[tasks.length - 1].id + 1;
    }

    const newTask = {
      id: newId,
      text: taskName,
      completed: false,
    }

    //Actualizar array y limpiar input
    setTasks(prev => [...prev, newTask]);
    setTaskName("")

  }

  return (
    <div>
      <ul>{tasks.map((task) => (
        <li key={task.id}>Tarea nº {task.id} con nombre: {task.text} en estado: {task.completed ? "Completada" : "Pendiente"} </li>
      ))}
      </ul>
      <br />
      <input type="text" name="text" onChange={updateTaskName} value={taskName} />
      <button type="button" onClick={createTask}>Añadir tarea</button>
    </div>
  )

}

export default App
