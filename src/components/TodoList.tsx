import TodoItem from './TodoItem';
import type { Task } from '../types/Task';

type TodoListProps = {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggleCompleted: (id: number) => void;
}
function TodoList({ tasks, onDelete, onToggleCompleted }: TodoListProps) {

        return (
            <div>
                <h2>Lista de Tareas</h2>
                <ul>
                    {tasks.map((task) => (
                        <TodoItem
                            key={task.id}
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