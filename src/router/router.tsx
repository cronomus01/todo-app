import { createBrowserRouter } from 'react-router-dom';
import CreateTask from '../components/pages/CreateTask';
import { createTask, getTasks, viewTask, taskAction } from '../utils/task';
import DraggableTasks from '../components/tasks/DraggableTasks';
import App from '../App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: getTasks,
        children: [
            {
                path: '/',
                element: <DraggableTasks />,
                loader: getTasks,
            },
            {
                path: '/tasks/create',
                element: <CreateTask />,
                action: createTask,
            },
            {
                path: '/tasks/:id',
                action: taskAction,
                loader: viewTask,
                element: <CreateTask />,
            },
        ],
    },
]);

export default router;
