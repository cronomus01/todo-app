import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CreateTask = () => {
    const [path, setPath] = useState('/');

    useEffect(() => {
        setPath(location.pathname);
        console.log(path);
    }, [path]);

    return (
        <>
            <section className="p-5">
                {path !== '/' && (
                    <Link
                        to="/"
                        onClick={() => setPath(location.pathname)}
                        className="order-1"
                    >
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
                )}
                <div className="mt-3 container flex justify-center">
                    <Form
                        className="flex flex-col gap-2"
                        method="post"
                        action="/tasks/create"
                    >
                        <input
                            type="text"
                            placeholder="Task"
                            className="border p-2 rounded"
                            name="title"
                        />
                        <textarea
                            name="description"
                            id=""
                            cols={30}
                            rows={10}
                            className=" border rounded p-2"
                            placeholder="Description of your task..."
                        ></textarea>
                        <button
                            type="submit"
                            className="p-2 border rounded-lg hover:border-slate-800 text-slate-800 shadow-md hover:shadow-none"
                            onClick={() => setPath(location.pathname)}
                        >
                            Save
                        </button>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default CreateTask;
