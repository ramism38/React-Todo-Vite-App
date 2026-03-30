import type { Task } from '../types/Task';
import './TodoItem.css';

//Declaracion de props
type TodoItemProps = {
    task: Task;
    onDelete: (id: number) => void;
    onToggleCompleted: (id: number) => void;
}

function TodoItem(props: TodoItemProps) {
    const { task, onDelete, onToggleCompleted } = props;
    return (

        <li> <span className={`todo-item__text ${task.completed ? "todo-item__text--completed" : ""}`}>{task.text} </span>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
            <button onClick={() => onToggleCompleted(task.id)}> {task.completed ? "Marcar como pendiente" : "Marcar como completada"}</button>
        </li>
    );

}

export default TodoItem;