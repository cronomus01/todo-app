import { Form } from 'react-router-dom';
import { Task as TaskType } from '../../types/Task';

type TasksProps = {
    tasks: TaskType[];
    search: string;
};

const Tasks = ({ tasks, search }: TasksProps) => {
    const items = tasks.map((task) => {
        if (task.title.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return;
        }

        return (
            <li
                key={task.id}
                className="border flex justify-between gap-2 p-2 rounded items-center overflow-hidden text-ellipsis"
            >
                <h2 className="font-bold overflow-hidden truncate">
                    {task.title}
                </h2>
                <Form action={`/tasks/${task.id}`} method="POST">
                    <button className="text-sm text-rose-700">Remove</button>
                </Form>
            </li>
        );
    });

    return (
        <>
            {items.length > 0 ? (
                <ul className="flex flex-col gap-2">{items}</ul>
            ) : (
                <p className=" text-gray-400 px-2">
                    You have no tasks assigned at the moment.
                </p>
            )}
        </>
    );
};

export default Tasks;
