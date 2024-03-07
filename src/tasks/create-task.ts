import { redirect } from "react-router-dom";
import Task from "../types/Task";

const getTasks = () => {
  if (localStorage.getItem("task")) {
    return JSON.parse(localStorage.getItem("task")!);
  } else {
    return []
  }
};


export async function createTaskAction({request}: {request: Request}) {
  const formData = await request.formData();
  const task = JSON.stringify(Object.fromEntries(formData));
  createTask(JSON.parse(task));
  return redirect('/')
}

const createTask = (task: Task) => {
  const newTask = {
    ...task, 
    id: Math.abs(Math.floor(Math.random() * 10000)).toString(), 
    isCompleted: false, 
    isWorking: false,
    isPending: false,
    date: new Date(),
  }

  if(newTask.title) {
    if(!localStorage.getItem('task')) {
      localStorage.setItem('task', JSON.stringify([newTask]))
    } else {
      const taskLists:Task[] = JSON.parse(localStorage.getItem('task')!);
      taskLists.unshift(newTask)
      localStorage.setItem('task', JSON.stringify(taskLists));
    }
  }
  
}

export async function createTaskLoader(): Promise<Task[]> {
  const tasks = await getTasks();
  return tasks;
}


