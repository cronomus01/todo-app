import { Link } from 'react-router-dom';
import Tasks from '../tasks/Tasks';
import { Task as TaskType } from '../../types/Task';

interface SidebarProps {
    tasks: TaskType[];
}

const Sidebar = ({ tasks }: SidebarProps) => {
    return (
        <>
            <aside className="h-full border-r-[1px] px-2 pt-4 flex flex-col gap-2">
                <Link to="tasks/create">
                    <button className="rounded bg-slate-900 p-2 text-white w-full">
                        Create new task
                    </button>
                </Link>
                <Tasks tasks={tasks} search=""></Tasks>
            </aside>
        </>
    );
};

export default Sidebar;
