// Importamos useState para manejar el estado local del input
import { useState } from 'react';

// Tipo de las props que recibe el formulario
type TodoFormProps = {
  // Función que recibe el texto de la nueva tarea
  onAddTask: (text: string) => void;
};

function TodoForm({ onAddTask }: TodoFormProps) {
  // Estado local del input controlado.
  // Aquí guardamos lo que el usuario va escribiendo.
  const [newTaskText, setNewTaskText] = useState('');

  // Función que se ejecuta cada vez que cambia el valor del input.
  // event.target.value contiene el texto actual del campo.
  const updateNewTaskText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  // Función que se ejecuta al pulsar el botón "Añadir tarea"
  const handleAddTask = () => {
    // Evitamos enviar texto vacío o solo espacios
    if (newTaskText.trim() === '') return;

    // Avisamos al componente padre (App) para que cree la tarea
    onAddTask(newTaskText);

    // Limpiamos el input después de añadir
    setNewTaskText('');
  };

  return (
    <div className="todo-form">
      <h2>Formulario de nueva tarea</h2>

      {/* Input controlado:
          - value viene del estado
          - onChange actualiza el estado */}
      <input
        type="text"
        name="text"
        onChange={updateNewTaskText}
        value={newTaskText}
        placeholder="Añadir nueva tarea"
      />

      {/* Botón para enviar la tarea.
          Está deshabilitado si el input está vacío. */}
      <button
        type="button"
        onClick={handleAddTask}
        disabled={newTaskText.trim() === ''}
      >
        Añadir tarea
      </button>
    </div>
  );
}

export default TodoForm;