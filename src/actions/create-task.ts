import { redirect } from "react-router-dom";

import Task from "../types/Task";

// @ts-ignore
export async function action({request, params}) {
  const formData = await request.formData();
  const task = JSON.stringify(Object.fromEntries(formData));
  saveToLocalStorage(JSON.parse(task));
  return redirect('/')
}

const saveToLocalStorage = (task: Task) => {
  const newTask = {
    ...task, 
    id: Math.floor(Math.random() * 10000), 
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