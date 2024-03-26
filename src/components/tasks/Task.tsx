import { useState } from 'react';

const Task = ({ task }) => {
    const handleDragStart = (event: React.DragEvent) => {
        console.log(`task dragging started`);
        console.log(event.dataTransfer);
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.effectAllowed = 'move';
    };

    const initBorderColor = () => {
        switch (task.status) {
            case 'working':
                return 'border-cyan-500';
            case 'completed':
                return 'border-green-500';
            default:
                return 'border-red-500';
        }
    };

    return (
        <li
            id={task.id}
            onDragStart={(event) => handleDragStart(event)}
            className={`cursor-pointer px-3 py-2 rounded-lg border ${initBorderColor()}`}
            onClick={() => console.log('clicked')}
            draggable="true"
        >
            <h2 className="select-none">{task.title}</h2>
            <p className="select-none">{task.description}</p>
        </li>
    );
};

export default Task;
