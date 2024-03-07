import { redirect } from "react-router-dom";
import { createTaskLoader } from "./create-task";

// @ts-ignore
export async function deleteTaskAction({params}) {
    
    let tasks = await createTaskLoader();
    let index = tasks.findIndex(task => task.id === params.id);

    if(index >= -1) {
        tasks.splice(index, 1)
        localStorage.setItem('task', JSON.stringify(tasks));
    }

    return redirect('/');
}