import { useLoaderData } from 'react-router-dom';
import Task from './Task';
import { Task as TaskType } from '../../types/Task';

type DraggableTaskProps = {
    tasks: TaskType[];
    onHandleDrop: (event: React.DragEvent<HTMLUListElement>) => void;
    onHandleDragOver: (event: React.DragEvent<HTMLUListElement>) => void;
};

function Pending({
    tasks,
    onHandleDrop,
    onHandleDragOver,
}: DraggableTaskProps) {
    const rows = tasks.map((task) => <Task task={task} key={task.id} />);

    return (
        <div className="basis-full border-r-[1px] flex flex-col px-2 pt-2">
            <h2 className="text-center">Pending</h2>
            <ul
                key="pending"
                id="pending"
                onDrop={(event) => onHandleDrop(event)}
                onDragOver={(event) => onHandleDragOver(event)}
                className="flex flex-col gap-2 mt-2 w-full h-full"
            >
                {tasks && rows}
            </ul>
        </div>
    );
}

function Working({
    tasks,
    onHandleDrop,
    onHandleDragOver,
}: DraggableTaskProps) {
    const rows = tasks.map((task) => <Task task={task} key={task.id} />);
    return (
        <div className="basis-full border-r-[1px] flex flex-col px-2 pt-2">
            <h2 className="text-center">Working</h2>
            <ul
                key="working"
                id="working"
                onDrop={(event) => onHandleDrop(event)}
                onDragOver={(event) => onHandleDragOver(event)}
                className="flex flex-col gap-2 mt-2 w-full h-full"
            >
                {tasks && rows}
            </ul>
        </div>
    );
}

function Completed({
    tasks,
    onHandleDrop,
    onHandleDragOver,
}: DraggableTaskProps) {
    const rows = tasks.map((task) => <Task task={task} key={task.id} />);
    return (
        <div className="basis-full border-r-[1px] flex flex-col px-2 pt-2 ">
            <h2 className="text-center">Completed</h2>
            <ul
                key="completed"
                id="completed"
                onDrop={(event) => onHandleDrop(event)}
                onDragOver={(event) => onHandleDragOver(event)}
                className="flex flex-col gap-2 mt-2 w-full h-full"
            >
                {tasks && rows}
            </ul>
        </div>
    );
}

type TaskDictionary<T> = {
    [key: string]: T;
};

function DraggableTasks() {
    const tasks = useLoaderData() as TaskType[];

    const handleDragOver = (
        event: React.DragEvent<HTMLLIElement | HTMLUListElement>,
    ) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const saveTasks = async (tasks: TaskType[]) => {
        localStorage.setItem('MY_TASKS', JSON.stringify(tasks));
    };

    const handleDrop = async (event: React.DragEvent<HTMLUListElement>) => {
        event.preventDefault();

        const container = event.target as HTMLUListElement;

        console.log(`task droped and is now ${container.id}`);

        const data = event.dataTransfer.getData('text');
        const item = document.getElementById(data)! as HTMLLIElement;

        switch (container.id) {
            case 'working':
                item.classList.remove('border-green-500');
                item.classList.remove('border-red-500');
                item.classList.add('border-cyan-500');
                break;
            case 'completed':
                item.classList.remove('border-cyan-500');
                item.classList.remove('border-red-500');
                item.classList.add('border-green-500');
                break;
            default:
                item.classList.remove('border-cyan-500');
                item.classList.remove('border-green-500');
                item.classList.add('border-red-500');
        }

        container.appendChild(item);

        if (container.id) {
            const updatedTasks = tasks.map((task) => {
                if (task.id == data) {
                    task.status = container.id;
                }

                return task;
            });

            await saveTasks(updatedTasks);
        }

        return;
    };

    const TaskDictionary: TaskDictionary<TaskType[]> = {};
    let lastTaskStatus = '';

    tasks.forEach((task) => {
        if (task.status !== lastTaskStatus) {
            TaskDictionary[task.status] = [];
        }

        lastTaskStatus = task.status;
        TaskDictionary[task.status] = [...TaskDictionary[task.status], task];
    });

    return (
        <div>
            <div className="flex border-b-[1px] h-full">
                {/* {columns} */}

                <Pending
                    tasks={TaskDictionary.pending ? TaskDictionary.pending : []}
                    onHandleDragOver={handleDragOver}
                    onHandleDrop={handleDrop}
                />

                <Working
                    tasks={TaskDictionary.working ? TaskDictionary.working : []}
                    onHandleDragOver={handleDragOver}
                    onHandleDrop={handleDrop}
                />

                <Completed
                    tasks={
                        TaskDictionary.completed ? TaskDictionary.completed : []
                    }
                    onHandleDragOver={handleDragOver}
                    onHandleDrop={handleDrop}
                />
            </div>
        </div>
    );
}

export default DraggableTasks;
