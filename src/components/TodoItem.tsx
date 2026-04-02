// Importamos el tipo Task para tipar la tarea recibida por props
import type { Task } from '../types/Task';

// Importamos los estilos del componente
import './TodoItem.css';

// Tipo de las props que recibe TodoItem
type TodoItemProps = {
  // La tarea concreta que este componente debe mostrar
  task: Task;

  // Función que recibe el id de la tarea a eliminar
  onDelete: (id: number) => void;

  // Función que recibe el id de la tarea a completar/descompletar
  onToggleCompleted: (id: number) => void;
};

function TodoItem(props: TodoItemProps) {
  // Extraemos las props para escribir menos y mejorar la legibilidad
  const { task, onDelete, onToggleCompleted } = props;

  return (
    <li>
      {/* Mostramos el texto de la tarea.
          Si task.completed es true, añadimos una clase extra
          para poder aplicar un estilo visual (por ejemplo line-through). */}
      <span
        className={`todo-item__text ${task.completed ? 'todo-item__text--completed' : ''}`}
      >
        {task.text}
      </span>

      {/* Botón para eliminar la tarea.
          Usamos arrow function para pasar el id concreto al hacer click. */}
      <button onClick={() => onDelete(task.id)}>
        Eliminar
      </button>

      {/* Botón para cambiar el estado completed.
          El texto cambia según el estado actual de la tarea. */}
      <button onClick={() => onToggleCompleted(task.id)}>
        {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      </button>
    </li>
  );
}

export default TodoItem;