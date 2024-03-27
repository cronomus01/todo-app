import { Link } from 'react-router-dom';
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

    const completedChecklist = task.checklist.filter(
        (checklist) => checklist.isChecked,
    ).length;

    const totalChecklist = task.checklist.length;

    return (
        <li
            id={task.id}
            onDragStart={(event) => handleDragStart(event)}
            className={`cursor-pointer px-3 py-2 rounded-lg relative border ${initBorderColor()}`}
            onClick={() => console.log('clicked')}
            draggable="true"
        >
            {task.id}
            <Link to={`/tasks/${task.id}`} draggable="false">
                <article className="pr-3">
                    <h2 className="select-none font-bold">{task.title}</h2>
                    <p className="select-none">{task.description}</p>
                </article>
                <div className="absolute top-0 right-0 m-2">
                    <span>
                        {completedChecklist}/{totalChecklist}
                    </span>
                </div>
            </Link>
        </li>
    );
};

export default Task;
