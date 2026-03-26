import { useState } from 'react';
import './App.css'
import TodoItem from './components/TodoItem';

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
  const [newTaskText, setNewTaskText] = useState("");

  //Actualizar input cuando el usuario escribe
  const updateNewTaskText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  }

  //Crear nueva tarea
  const createTask = () => {
    if (newTaskText.trim() === "") return; //Evitamos tareas vacias

    //Generar nuevo ID con condiciones
    /*let newId = 0;
    if (tasks.length != 0) {
      newId = tasks[tasks.length - 1].id + 1;
    }*/

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    }

    //Actualizar array y limpiar input
    setTasks(prev => [...prev, newTask]);
    setNewTaskText("")

  }

  //Borrar una tarea
  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter((task) => task.id !== id));
  }
  //Actualizar estado de una tarea
  const updateTaskState = (id: number) => {
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
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleCompleted={updateTaskState}
          />
        ))}
      </ul>
      <br />
      <input type="text" name="text" onChange={updateNewTaskText} value={newTaskText} />
      <button type="button" onClick={createTask}>Añadir tarea</button>
    </div>
  )

}

export default App
