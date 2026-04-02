// Importamos los hooks que necesitamos desde React:
// - useState: para guardar y actualizar estado
// - useEffect: para ejecutar efectos secundarios (en este caso, guardar en localStorage)
import { useEffect, useState } from 'react';

// Importamos los estilos generales de la aplicación
import './App.css';

// Importamos los componentes hijos que usa App
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// Importamos el tipo Task para tipar correctamente las tareas con TypeScript
import type { Task } from './types/Task';

function App() {
  // Estado principal de la aplicación: lista de tareas
  //
  // Usamos "lazy initialization" pasando una función a useState.
  // Esto hace que React ejecute esta lógica SOLO una vez, al montar el componente.
  //
  // La idea es:
  // 1. Intentar leer tareas guardadas en localStorage
  // 2. Si existen, usarlas como estado inicial
  // 3. Si no existen, usar tareas de ejemplo
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');

    // Si localStorage tiene algo guardado, lo convertimos de string a array con JSON.parse
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }

    // Si no hay nada guardado, usamos estas tareas de ejemplo
    return [
      { id: 1, text: 'Aprender React', completed: false },
      { id: 2, text: 'Hacer TODO App', completed: true },
    ];
  });

  // Estado que controla el filtro actual visible en la interfaz.
  //
  // Puede valer solo una de estas 3 opciones:
  // - "all"        -> mostrar todas las tareas
  // - "completed"  -> mostrar solo las completadas
  // - "pending"    -> mostrar solo las pendientes
  //
  // Lo tipamos explícitamente con una unión de strings.
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // Estado derivado: tareas filtradas según el filtro actual.
  //
  // IMPORTANTE:
  // Esto NO necesita useState porque no lo guardamos realmente.
  // Se puede calcular directamente a partir de:
  // - tasks
  // - filter
  //
  // Si filter es "all"       -> devolvemos todas (true para todas)
  // Si filter es "completed" -> solo las completadas
  // Si filter es "pending"   -> solo las no completadas
  const filteredTasks = tasks.filter((task) =>
    filter === 'all'
      ? true
      : filter === 'completed'
      ? task.completed
      : !task.completed
  );

  /*
  // Versión anterior usando switch.
  // Funciona, pero la versión actual es más compacta y más declarativa.
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
  */

  // Efecto secundario:
  // Cada vez que cambie "tasks", guardamos la lista actual en localStorage.
  //
  // JSON.stringify convierte el array de objetos en string,
  // porque localStorage solo puede guardar strings.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Función para crear una nueva tarea.
  //
  // Recibe el texto desde TodoForm mediante props/callback.
  const createTask = (text: string) => {
    // Si el texto está vacío o solo tiene espacios, no hacemos nada
    if (text.trim() === '') return;

    // Creamos el objeto de la nueva tarea
    const newTask: Task = {
      id: Date.now(), // Usamos la fecha actual como id simple y único
      text, // Atajo de ES6 equivalente a "text: text"
      completed: false, // Toda tarea nueva empieza como pendiente
    };

    // Actualizamos el estado sin mutarlo directamente.
    //
    // prev = estado anterior
    // [...prev, newTask] = copiamos las tareas anteriores y añadimos la nueva al final
    setTasks((prev) => [...prev, newTask]);
  };

  // Función para borrar una tarea por id.
  const deleteTask = (id: number) => {
    // filter devuelve un nuevo array con todas las tareas EXCEPTO la que tiene ese id
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Función para marcar/desmarcar una tarea como completada.
  const toggleTask = (id: number) => {
    // map recorre todas las tareas:
    // - si coincide el id -> devolvemos una copia con completed invertido
    // - si no coincide -> devolvemos la tarea tal cual
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Mensaje que se mostrará si no hay tareas en el filtro actual.
  //
  // Lo hacemos dinámico para que la UI sea más clara:
  // - No hay tareas
  // - No hay tareas completadas
  // - No hay tareas pendientes
  let emptyMessage = '';

  if (filter === 'completed') {
    emptyMessage = 'No hay tareas completadas';
  } else if (filter === 'pending') {
    emptyMessage = 'No hay tareas pendientes';
  } else {
    emptyMessage = 'No hay tareas';
  }

  // Render del componente principal
  return (
    <div>
      {/* Título principal de la aplicación */}
      <h1>Mi TODO App</h1>

      {/* Formulario para añadir nuevas tareas.
          Le pasamos createTask como prop para que TodoForm pueda avisar a App */}
      <TodoForm onAddTask={createTask} />

      {/* Botones de filtro */}
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === 'all' ? 'filter-button--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>

        <button
          className={`filter-button ${filter === 'completed' ? 'filter-button--active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </button>

        <button
          className={`filter-button ${filter === 'pending' ? 'filter-button--active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </button>
      </div>

      {/* Render condicional:
          - si no hay tareas en el filtro actual -> mostramos mensaje
          - si sí hay -> mostramos la lista */}
      {filteredTasks.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <TodoList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggleCompleted={toggleTask}
        />
      )}
    </div>
  );
}

export default App;