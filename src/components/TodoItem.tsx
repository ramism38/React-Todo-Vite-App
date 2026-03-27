import type { Task } from '../types/Task';

//Declaracion de props
type TodoItemProps = {
    task: Task;
    onDelete: (id: number) => void;
    onToggleCompleted: (id: number) => void;
}

function TodoItem(props: TodoItemProps) {
    const { task, onDelete, onToggleCompleted } = props;
    return (

        <li> Tarea nº {task.id} con nombre: {task.text} en estado: {task.completed ? "Completada" : "Pendiente"}
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
            <button onClick={() => onToggleCompleted(task.id)}> {task.completed ? "Marcar como pendiente" : "Marcar como completada"}</button>
        </li>
    );

}

export default TodoItem;