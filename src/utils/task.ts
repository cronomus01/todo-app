import { redirect } from 'react-router-dom';

export async function createTask({ request }: { request: Request }) {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData);

    const task = {
        title: formDataObject.title,
        description: formDataObject.description,
        id: Math.abs(Math.floor(Math.random() * 10000)).toString(),
        status: 'pending',
        date: new Date(),
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

export async function deleteTask({ params }) {
    const tasks = JSON.parse(localStorage.getItem('MY_TASKS')!);
    const index = tasks.findIndex((task) => task.id === params.id);

    if (index >= -1) {
        tasks.splice(index, 1);
        localStorage.setItem('MY_TASKS', JSON.stringify(tasks));
    }

    return redirect('/');
}
