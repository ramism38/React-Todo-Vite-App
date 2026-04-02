// Importamos el componente que representa una única tarea
import TodoItem from './TodoItem';

// Importamos el tipo Task
import type { Task } from '../types/Task';

// Tipo de las props que recibe TodoList
type TodoListProps = {
  // Array de tareas a mostrar
  tasks: Task[];

  // Función para eliminar una tarea
  onDelete: (id: number) => void;

  // Función para alternar el estado completed de una tarea
  onToggleCompleted: (id: number) => void;
};

function TodoList({ tasks, onDelete, onToggleCompleted }: TodoListProps) {
  // Este componente no tiene estado propio.
  // Su única responsabilidad es renderizar la lista de tareas.
  return (
    <div>
      <h2>Lista de Tareas</h2>

      <ul>
        {/* Recorremos el array de tareas y renderizamos un TodoItem por cada una */}
        {tasks.map((task) => (
          <TodoItem
            key={task.id} // key ayuda a React a identificar cada elemento de la lista
            task={task}
            onDelete={onDelete}
            onToggleCompleted={onToggleCompleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;