import { Route, Routes, useLoaderData } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import CreateTask from './CreateTask';
import DraggableTasks from '../tasks/DraggableTasks';

const Homepage = () => {
    const tasks = useLoaderData();

    return (
        <>
            <div className="grid grid-cols-desktop h-full relative">
                <Sidebar tasks={tasks}></Sidebar>
                <main className="grid grid-rows-content">
                    <Header></Header>
                    <Routes>
                        <Route path="" element={<DraggableTasks />} />
                        <Route path="/tasks/create" element={<CreateTask />} />
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default Homepage;
