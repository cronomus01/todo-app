import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { Task } from './types/Task';

function App() {
    const tasks = useLoaderData() as Task[];
    return (
        <>
            <div className="grid grid-cols-desktop h-full relative">
                <Sidebar tasks={tasks}></Sidebar>
                <main className="grid grid-rows-content">
                    <Header></Header>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default App;
