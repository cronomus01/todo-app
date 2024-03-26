import { createBrowserRouter } from 'react-router-dom';
import CreateTask from '../components/pages/CreateTask';
import { createTask, getTasks, deleteTask } from '../utils/task';
import Homepage from '../components/pages/Homepage';
import DraggableTasks from '../components/tasks/DraggableTasks';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
        loader: getTasks,
        children: [
            {
                path: '',
                element: <DraggableTasks />,
            },
            {
                path: '/tasks/create',
                element: <CreateTask />,
                action: createTask,
            },
            {
                path: '/tasks/:id',
                action: deleteTask,
            },
        ],
    },
]);

export default router;
