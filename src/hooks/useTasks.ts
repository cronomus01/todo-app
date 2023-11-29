import { useState } from "react";
import Task from "../types/Task";


export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>()

  // if (localStorage.getItem("task")) {
  //   const tasks = JSON.parse(localStorage.getItem("task")!);
  //   setTasks(tasks);
  // }

  return {tasks, setTasks}
}
