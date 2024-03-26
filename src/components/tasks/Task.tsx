import { Task as TaskType } from '../../types/Task';

const Task = ({ task }: { task: TaskType }) => {
    const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        console.log(`task dragging started`);
        const task = event.target as HTMLLIElement;
        console.log(event.dataTransfer);
        event.dataTransfer.setData('text/plain', task.id);
        event.dataTransfer.effectAllowed = 'move';
    };

    const initBorderColor = () => {
        switch (task.status) {
            case 'working':
                return 'border-cyan-500';
            case 'completed':
                return 'border-green-500';
            default:
                return 'border-red-500';
        }
    };

    return (
        <li
            id={task.id}
            onDragStart={(event) => handleDragStart(event)}
            className={`cursor-pointer px-3 py-2 rounded-lg border ${initBorderColor()}`}
            onClick={() => console.log('clicked')}
            draggable="true"
        >
            <h2 className="select-none">{task.title}</h2>
            <p className="select-none">{task.description}</p>
        </li>
    );
};

export default Task;
