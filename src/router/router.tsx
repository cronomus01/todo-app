import { createBrowserRouter } from "react-router-dom";
import CreateTask from "../components/tasks/CreateTask";
import { action as createTask } from "../actions/create-task";
import { loader as createTaskLoader } from "../loader/create-task";
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
    action: createTask,
    loader: createTaskLoader,
  },
]);

export default router;
