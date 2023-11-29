export async function loader() {
  const tasks = await getTasks();
  return tasks;
}

const getTasks = () => {
  if (localStorage.getItem("task")) {
    return JSON.parse(localStorage.getItem("task")!);
  } else {
    return []
  }
};
