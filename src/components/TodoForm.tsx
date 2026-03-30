import React, { useState } from 'react';

type TodoFormProps = {
    onAddTask: (text: string) => void;
}

function TodoForm({ onAddTask }: TodoFormProps) {
    //Input controlado
    const [newTaskText, setNewTaskText] = useState("");

    //Actualizar input cuando el usuario escribe
    const updateNewTaskText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskText(event.target.value);
    }
    //Manejar el evento de añadir tarea
    const handleAddTask = () => {
        if (newTaskText.trim() === "") return;
        onAddTask(newTaskText);
        setNewTaskText("");

    }

    return (
        <div>
            <h2>Formulario de nueva tarea</h2>
            <input type="text" name="text" onChange={updateNewTaskText} value={newTaskText} placeholder='Añadir nueva tarea'/>
            <button type="button" onClick={handleAddTask} disabled={newTaskText.trim() === ""}>Añadir tarea</button>
        </div>
    );


}
export default TodoForm;