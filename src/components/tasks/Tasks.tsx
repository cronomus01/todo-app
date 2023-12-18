import Task from "../../types/Task";
import { NavLink } from "react-router-dom";
import { useLoaderData } from "../../hooks/useLoaderData";

const Tasks = () => {
  const tasks = useLoaderData<Task[]>();

  return (
    <nav className="mt-6 px-2">
      <ul className="flex flex-col gap-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <NavLink to={`/tasks/${task.id}/edit`} draggable={false}>
              <li
                key={task.id}
                className="py-2 px-2 border rounded hover:border-slate-800 flex gap-2 items-center justify-between"
              >
                <h2 className="w-full">{task.title}</h2>
                <div>
                  <NavLink to={`/tasks/${task.id}`}>
                    <button className="text-sm text-rose-700">Delete</button>
                  </NavLink>
                </div>
              </li>
            </NavLink>
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
