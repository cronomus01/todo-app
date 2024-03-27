import { Form, useSubmit } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CheckList, Task } from '../../types/Task';
import Icons8Input24 from '../../assets/icons8-input-24.png';
import Icons8Checked24 from '../../assets/icons8-checked-24.png';
import Icons8Date24 from '../../assets/icons8-date-24.png';

interface TaskFormProps {
    task?: Task;
}

const TaskForm = ({ task }: TaskFormProps) => {
    const [formData, setFormData] = useState<Task>({
        id: '',
        title: '',
        description: '',
        status: '',
        date: undefined,
        checklist: [],
        startDate: undefined,
        dueDate: undefined,
    });

    const [checklist, setChecklist] = useState<CheckList[]>([
        {
            name: '',
            isChecked: false,
        },
    ]);

    useEffect(() => {
        if (task) {
            setChecklist(task.checklist);
            setFormData(task);
        } else {
            setFormData({
                id: '',
                title: '',
                description: '',
                status: '',
                date: undefined,
                checklist: [],
                startDate: undefined,
                dueDate: undefined,
            });
            setChecklist([]);
        }
    }, [task]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [target.name]: target.value,
        }));
    };

    const handleCheckList = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        console.log(index);
        const newValues = [...checklist];

        const target = event.target;

        if (target.value === 'on') {
            newValues[index] = {
                name: newValues[index].name,
                isChecked: !newValues[index].isChecked,
            };
        } else {
            newValues[index] = {
                name: target.value,
                isChecked: newValues[index].isChecked,
            };
        }

        setChecklist(newValues);
        setFormData((prevFormData) => ({
            ...prevFormData,
            checklist: newValues.filter((checklist) => checklist.name),
        }));
    };

    const handleAddChecklist = () => {
        setChecklist((prevItems) => [
            ...prevItems,
            { name: '', isChecked: false },
        ]);
    };

    const submit = useSubmit();

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const json = JSON.stringify(formData);

        if (task) {
            submit(json, {
                method: 'PUT',
                encType: 'application/json',
                action: `/tasks/${task.id}`,
            });
        } else {
            submit(json, {
                method: 'POST',
                encType: 'application/json',
                action: '/tasks/create',
            });
        }
    };
    return (
        <div className="mt-3 container flex flex-col gap-3">
            <Form
                className="flex gap-2"
                id="create-task-form"
                onSubmit={(event) => handleSubmit(event)}
            >
                <fieldset className="flex flex-col gap-2 basis-full">
                    <input
                        value={formData.title}
                        type="text"
                        placeholder="Task"
                        className="border border-slate-900 p-2 rounded"
                        name="title"
                        onChange={(event) => handleInputChange(event)}
                    />
                    <textarea
                        value={formData.description}
                        name="description"
                        cols={30}
                        rows={10}
                        className=" border border-slate-900 rounded p-2 h-full"
                        placeholder="Description of your task..."
                        onChange={(event) => handleInputChange(event)}
                    ></textarea>
                </fieldset>
                <fieldset className="flex flex-col gap-2 basis-full">
                    <button
                        type="button"
                        className="border border-slate-900 flex justify-between px-2 py-2 rounded items-center"
                        onClick={() => handleAddChecklist()}
                    >
                        <span>Checklist</span>
                        <img src={Icons8Input24} alt="" />
                    </button>
                    {checklist.map((item, index) => (
                        <div className="flex gap-2">
                            <label htmlFor={`${index}`}>
                                <div className="w-[30px] h-full border border-slate-500 rounded flex items-center justify-center">
                                    {item.isChecked && (
                                        <img
                                            src={Icons8Checked24}
                                            alt=""
                                            width={20}
                                        />
                                    )}
                                </div>
                                <input
                                    id={`${index}`}
                                    checked={item.isChecked}
                                    type="checkbox"
                                    placeholder="Task"
                                    className="absolute hidden"
                                    onChange={(event) =>
                                        handleCheckList(event, index)
                                    }
                                />
                            </label>
                            <input
                                key={index}
                                type="text"
                                className="px-2 py-1 border border-slate-900 rounded w-full"
                                name="checklist"
                                value={item.name}
                                onChange={(event) =>
                                    handleCheckList(event, index)
                                }
                            />
                        </div>
                    ))}
                </fieldset>
                <fieldset className="flex flex-col gap-2 basis-full">
                    <h2
                        className="border border-slate-900 flex justify-between px-2 py-2 rounded items-center"
                        onClick={() => handleAddChecklist()}
                    >
                        <span>Start - End date</span>
                        <img
                            src={Icons8Date24}
                            alt={`${Icons8Date24.match('date')}`}
                        />
                    </h2>
                    <label htmlFor="start-date">
                        Start date:
                        <input
                            id="start-date"
                            type="date"
                            placeholder="Task"
                            className="border border-slate-900 p-2 rounded w-full mt-2"
                            name="startDate"
                            value={`${formData?.startDate}`}
                            onChange={(event) => handleInputChange(event)}
                        />
                    </label>
                    <label htmlFor="end-date">
                        Due date:
                        <input
                            id="end-date"
                            type="date"
                            placeholder="Task"
                            className="border border-slate-900 p-2 rounded w-full mt-2"
                            name="dueDate"
                            value={`${formData?.dueDate}`}
                            onChange={(event) => handleInputChange(event)}
                        />
                    </label>
                </fieldset>
            </Form>
            <button
                form="create-task-form"
                type="submit"
                className="py-2 px-5 bg-slate-900 text-white rounded w-min"
            >
                Save
            </button>
        </div>
    );
};

export default TaskForm;
