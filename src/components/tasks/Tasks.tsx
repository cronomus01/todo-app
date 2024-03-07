import Task from "../../types/Task";
import { Form } from "react-router-dom";
import { useLoaderData } from "../../hooks/useLoaderData";

const Tasks = () => {
  const tasks = useLoaderData<Task[]>();

  return (
    <nav className="mt-6 px-2">
      <ul className="flex flex-col gap-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
              <li
                key={task.id}
                className="py-2 px-2 border rounded hover:border-slate-800 flex gap-2 justify-between items-start"
              >
                <article className="overflow-hidden">
                  <h1 className="w-full">{task.title}</h1>
                  <p className="text-gray-600 truncate">{task.description}</p>
                </article>
                <Form action={`/tasks/${task.id}`} method="POST">
                  <button className="text-sm text-rose-700">Delete</button>
                </Form>
              </li>
          ))
        ) : (
          <li className="text-slate-800" key={0}>
            No tasks...
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Tasks;
