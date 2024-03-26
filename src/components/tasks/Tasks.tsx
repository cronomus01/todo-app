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
                className="border flex gap-2 p-2 rounded items-center"
            >
                <article className="basis-full">
                    <h2 className="font-bold">{task.title}</h2>
                </article>
                <Form action={`/tasks/${task.id}`} method="POST">
                    <button className="text-sm text-rose-700">Remove</button>
                </Form>
            </li>
        );
    });

    return (
        <>
            <ul className="flex flex-col gap-2">
                {items.length > 0 ? items : <p>No items</p>}
            </ul>
        </>
    );
};

export default Tasks;
