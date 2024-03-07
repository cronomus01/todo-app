import { createBrowserRouter } from "react-router-dom";
import CreateTask from "../components/tasks/CreateTask";
import { createTaskAction, createTaskLoader } from "../tasks/create-task";
import { deleteTaskAction } from "../tasks/delete-task";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: createTaskLoader,
  },
  {
    path: "/tasks/create",
    element: <CreateTask />,
    action: createTaskAction,
    loader: createTaskLoader,
  },
  {
    path: "/tasks/:id",
    action: deleteTaskAction
  },
]);

export default router;
