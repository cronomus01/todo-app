import { ActionFunction, redirect } from 'react-router-dom';
import { Task } from '../types/Task';

export async function createTask({ request }: { request: Request }) {
    const response = await request.json();

    const task = {
        ...response,
        id: Math.abs(Math.floor(Math.random() * 10000)).toString(),
        dateCreated: new Date(),
    };

    if (!localStorage.getItem('MY_TASKS')) {
        localStorage.setItem('MY_TASKS', JSON.stringify([task]));
    } else {
        const tasks = JSON.parse(localStorage.getItem('MY_TASKS')!);
        localStorage.setItem('MY_TASKS', JSON.stringify([...tasks, task]));
    }

    return redirect('/');
}

export async function getTasks() {
    if (localStorage.getItem('MY_TASKS')) {
        return JSON.parse(localStorage.getItem('MY_TASKS')!);
    }
    return [];
}

interface Params {
    id?: string;
}

export const viewTask: ActionFunction<Params> = async ({
    params,
}): Promise<Task | undefined> => {
    const tasks = JSON.parse(localStorage.getItem('MY_TASKS')!) as Task[];
    const task = tasks.find((task) => task.id === params.id);

    if (!task) return;

    return task;
};

const onUpdateTask = async (
    id: string | number,
    request: Request,
): Promise<void> => {
    const response = await request.json();

    const requestTask = {
        ...response,
        id: Math.abs(Math.floor(Math.random() * 10000)).toString(),
        status: 'pending',
        dateCreated: new Date(),
    };

    const tasks = JSON.parse(localStorage.getItem('MY_TASKS')!) as Task[];

    const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
            task = requestTask;
        }
        return task;
    });

    localStorage.setItem('MY_TASKS', JSON.stringify(updatedTasks));
};

const onDeleteTask = async (id: string | number): Promise<void> => {
    const tasks = JSON.parse(localStorage.getItem('MY_TASKS')!) as Task[];
    const index = tasks.findIndex((task) => task.id === id);

    if (index >= -1) {
        tasks.splice(index, 1);
        localStorage.setItem('MY_TASKS', JSON.stringify(tasks));
    }
};

export const taskAction: ActionFunction<{
    params: Params;
    request: Request;
}> = async ({ params, request }) => {
    if (!params.id) return;

    switch (request.method) {
        case 'PUT':
            await onUpdateTask(params.id, request);
            break;
        case 'POST':
            break;
        case 'DELETE':
            await onDeleteTask(params.id);
            break;
    }

    return redirect('/');
};
