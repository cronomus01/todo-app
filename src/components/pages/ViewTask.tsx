import { Link, useLoaderData } from 'react-router-dom';
import { Task } from '../../types/Task';

const ViewTask = () => {
    const task = useLoaderData() as Task;
    return (
        <>
            <section className="p-5">
                <Link to="/" className="order-1">
                    <button className="border rounded bg-white p-1 shadow-sm hover:border-slate-800 hover:text-slate-800 text-slate-500 flex item-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        Back
                    </button>
                </Link>
                <h1>Task {task.id}</h1>
            </section>
        </>
    );
};

export default ViewTask;
