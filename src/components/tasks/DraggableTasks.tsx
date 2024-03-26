import { useLoaderData } from 'react-router-dom';
import Task from './Task';
import { useState } from 'react';

function Pending({ tasks, onHandleDrop, onHandleDragOver }) {
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

function Working({ tasks, onHandleDrop, onHandleDragOver }) {
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

function Completed({ tasks, onHandleDrop, onHandleDragOver }) {
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

function DraggableTasks() {
    const [color, setColor] = useState('border-red-500');

    const tasks = useLoaderData();
    const handleDragOver = (
        event: React.DragEvent<HTMLLIElement | HTMLUListElement>,
    ) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (event: React.DragEvent<HTMLUListElement>) => {
        event.preventDefault();
        console.log(`task droped and is now ${event.target.id}`);

        // if (event.target.id === 'working') {
        //     setColor('border-cyan-500');
        // } else if (event.target.id === 'completed') {
        //     setColor('border-green-500');
        // }
        const data = event.dataTransfer.getData('text');

        const item = document.getElementById(data)!;

        console.log(event.target.id);

        switch (event.target.id) {
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

        event.target.appendChild(item);

        const updatedTasks = tasks.map((task) => {
            if (task.id == data) {
                task.status = event.target.id;
            }

            return task;
        });

        localStorage.setItem('MY_TASKS', JSON.stringify(updatedTasks));
    };

    const TaskDictionary = {};
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
