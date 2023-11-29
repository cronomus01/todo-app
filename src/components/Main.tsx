import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "../hooks/useLoaderData";
import Task from "../types/Task";
const Main = () => {
  const [path, setPath] = useState("/");
  const [newAdded, setNewAdded] = useState(false);

  // const [setNewAddedId, setNewAddedId] = useState<number>(0);

  const pendingColor = "border-slate-300";
  const completedColor = "border-green-400";
  const workingColor = "border-orange-400";

  const tasks = useLoaderData<Task[]>();

  console.log("Main component rerendered");

  const currentDragging = useRef<HTMLLIElement>();

  const pendingContainer = useRef<HTMLUListElement>(null);
  const completedContainer = useRef<HTMLUListElement>(null);
  const workingContainer = useRef<HTMLUListElement>(null);

  const currentDragTaskId = useRef<number | string>(0);

  useEffect(() => {
    setPath(location.pathname);
    setNewAdded(true);

    const timeOutMessage = addNewTimeoutMessage();

    return () => {
      clearTimeout(timeOutMessage);
    };

    console.log(newAdded);
  }, [path, tasks]);

  const addNewTimeoutMessage = () => {
    return setTimeout(() => {
      setNewAdded(false);
    }, 300000);
  };

  const handleDragEnter = (
    event: React.DragEvent<HTMLLIElement | HTMLUListElement>
  ) => {
    event.preventDefault();
    console.log("pending tasks entered a valid drop");

    // let container;

    // if (event.target instanceof HTMLUListElement) {
    //   container = event.target;
    // } else if (event.target instanceof HTMLLIElement) {
    //   container = event.target.parentElement;
    // }

    // if (!container) return;

    // switch (container.id) {
    //   case "pending":
    //     currentDragging.current?.classList.add("border");
    //     currentDragging.current?.classList.add("border-slate-300");
    //     currentDragging.current?.classList.remove("border-orange-400");
    //     currentDragging.current?.classList.remove("border-green-400");
    //     break;
    //   case "working-on":
    //     currentDragging.current?.classList.add("border");
    //     currentDragging.current?.classList.add("border-orange-400");
    //     currentDragging.current?.classList.remove("border-slate-400");
    //     currentDragging.current?.classList.remove("border-green-400");
    //     break;
    //   case "completed":
    //     currentDragging.current?.classList.add("border");
    //     currentDragging.current?.classList.add("border-green-400");
    //     currentDragging.current?.classList.remove("border-slate-300");
    //     currentDragging.current?.classList.remove("border-orange-400");
    //     break;
    // }

    event.stopPropagation();
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLLIElement | HTMLUListElement>
  ) => {
    event.preventDefault();
    // console.log("pending task dragging over");

    let container;

    if (event.target instanceof HTMLUListElement) {
      container = event.target;
    } else if (event.target instanceof HTMLLIElement) {
      container = event.target.parentElement;
    }

    if (!container) return;

    console.log(container.id);

    switch (container.id) {
      case "pending":
        currentDragging.current?.classList.add("border");
        currentDragging.current?.classList.add("border-slate-300");
        currentDragging.current?.classList.remove("border-orange-400");
        currentDragging.current?.classList.remove("border-green-400");
        container.append(currentDragging.current!);
        break;
      case "working-on":
        currentDragging.current?.classList.add("border");
        currentDragging.current?.classList.add("border-orange-400");
        currentDragging.current?.classList.remove("border-slate-400");
        currentDragging.current?.classList.remove("border-green-400");
        container.append(currentDragging.current!);
        break;
      case "completed":
        currentDragging.current?.classList.add("border");
        currentDragging.current?.classList.add("border-green-400");
        currentDragging.current?.classList.remove("border-slate-300");
        currentDragging.current?.classList.remove("border-orange-400");
        container.append(currentDragging.current!);
        break;
    }

    event.stopPropagation();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLLIElement | HTMLUListElement>
  ) => {
    event.preventDefault();
    console.log("pending task droped and is now completed");

    if (localStorage.getItem("task")) {
      const taskLists: Task[] = JSON.parse(localStorage.getItem("task")!);

      const newTaskList = taskLists.map((task) => {
        // return task that is not selected
        if (task.id !== currentDragTaskId.current) return task;

        let container;

        if (event.target instanceof HTMLUListElement) {
          container = event.target;
        } else if (event.target instanceof HTMLLIElement) {
          container = event.target.parentElement;
        }
        // check if container contains a ul element
        if (!container) return;

        const containerX = container.getBoundingClientRect().x;
        const containerWidth = container.getBoundingClientRect().width;

        // check if container is within the target drop range to append the task
        if (
          event.clientX > containerX &&
          event.clientX < containerX + containerWidth
        ) {
          console.log(container);
          container.append(currentDragging.current!);
        }

        // change task to category and check if the drop task contains the old color and change to new

        switch (container.id) {
          case "pending":
            task.isCompleted = false;
            task.isWorking = false;
            currentDragging.current?.classList.add(pendingColor);
            currentDragging.current?.classList.remove(completedColor);
            currentDragging.current?.classList.remove(workingColor);
            break;
          case "working-on":
            task.isWorking = true;
            task.isCompleted = false;
            currentDragging.current?.classList.add(workingColor);
            currentDragging.current?.classList.remove(pendingColor);
            currentDragging.current?.classList.remove(completedColor);
            break;
          case "completed":
            task.isCompleted = true;
            task.isWorking = false;
            currentDragging.current?.classList.add(completedColor);
            currentDragging.current?.classList.remove(pendingColor);
            currentDragging.current?.classList.remove(workingColor);
            break;
        }

        return task;
      });

      if (newTaskList.every((task) => task)) {
        localStorage.setItem("task", JSON.stringify(newTaskList));
      }
    }

    event.stopPropagation();
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLLIElement | HTMLUListElement>
  ) => {
    console.log("leaving the container");
    let container;

    if (event.target instanceof HTMLUListElement) {
      container = event.target;
    } else if (event.target instanceof HTMLLIElement) {
      container = event.target.parentElement;
    }

    if (!container) return;

    if (container.contains(currentDragging.current!)) {
      container.removeChild(currentDragging.current!);
    }
  };

  const handleDrag = (
    event: React.DragEvent<HTMLLIElement | HTMLUListElement>,
    id: number | string
  ) => {
    event.preventDefault();
    // console.log("dragging");

    currentDragTaskId.current = id;
    currentDragging.current = event.target as HTMLLIElement;

    let container;

    if (event.target instanceof HTMLUListElement) {
      container = event.target;
    } else if (event.target instanceof HTMLLIElement) {
      container = event.target.parentElement;
    }

    if (!container) return;

    console.log(container.id);

    switch (container.id) {
      case "pending":
        currentDragging.current?.classList.add("border");
        currentDragging.current?.classList.add("border-slate-300");
        currentDragging.current?.classList.remove("border-orange-400");
        currentDragging.current?.classList.remove("border-green-400");
        break;
      case "working-on":
        currentDragging.current?.classList.add("border");
        currentDragging.current?.classList.add("border-orange-400");
        currentDragging.current?.classList.remove("border-slate-300");
        currentDragging.current?.classList.remove("border-green-400");
        break;
      case "completed":
        currentDragging.current?.classList.add("border");
        currentDragging.current?.classList.add("border-green-400");
        currentDragging.current?.classList.remove("border-slate-300");
        currentDragging.current?.classList.remove("border-orange-400");
        break;
    }

    container.append(currentDragging.current!);

    event.stopPropagation();
  };

  const newAddedTask = (id: number, date: Date) => {
    if (tasks[0].id == id) {
      if (Math.abs(new Date(date).getTime() - new Date().getTime()) < 300000)
        return <p className="text-green-400">New</p>;
    }
    // { &&
    //   Math.abs(
    //     new Date(date).getTime() - new Date().getTime()
    //   ) === 5000 &&
  };

  return (
    <main className="flex items-start flex-col relative p-2">
      <h1 className="text-lg">My tasks</h1>
      <div className="flex gap-3 justify-between w-full h-full">
        <section className="mt-2 w-full max-w-sm md:max-w-lg">
          <h1 className="pointer-events-none">Pending</h1>
          <ul
            id="pending"
            ref={pendingContainer}
            className={"flex flex-col gap-2 mt-2 w-full h-full"}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
          >
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  !task.isCompleted &&
                  !task.isWorking && (
                    <li
                      key={task.id}
                      className={`border rounded-md p-2 cursor-pointer ${
                        !task.isCompleted ? pendingColor : completedColor
                      }`}
                      onDrag={(event) => handleDrag(event, task.id)}
                      // onDragEnter={(event) => handleDragEnter(event)}
                      onDragLeave={(event) => handleDragLeave(event)}
                      draggable={true}
                    >
                      <div className="flex gap-2 justify-between">
                        <h2 className="text-slate-800 font-bold select-none">
                          {task.title}
                        </h2>
                        {newAdded && newAddedTask(task.id, task.date)}
                      </div>
                      <p className="text-slate-800 select-none pointer-events-none break-words">
                        {task.description}
                      </p>
                    </li>
                  )
              )}
          </ul>
        </section>
        <div className="h-full border"></div>
        <section className="mt-2 w-full max-w-sm md:max-w-lg">
          <h1>Working on</h1>
          <ul
            id="working-on"
            ref={workingContainer}
            className={"flex flex-col gap-2 mt-2 w-full h-full"}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
          >
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.isWorking && (
                    <li
                      key={task.id}
                      className={`border rounded-md p-2 cursor-pointer  ${
                        task.isWorking ? workingColor : pendingColor
                      }`}
                      onDrag={(event) => handleDrag(event, task.id)}
                      // onDragEnter={(event) => handleDragEnter(event)}
                      onDragLeave={(event) => handleDragLeave(event)}
                      draggable={true}
                    >
                      <div className="flex gap-2 justify-between">
                        <h2 className="text-slate-800 font-bold select-none">
                          {task.title}
                        </h2>
                        {newAdded && newAddedTask(task.id, task.date)}
                      </div>
                      <p className="text-slate-800 select-none break-words">
                        {task.description}
                      </p>
                    </li>
                  )
              )}
          </ul>
        </section>
        <div className="h-full border"></div>
        <section className="mt-2 w-full max-w-sm md:max-w-lg">
          <h1>Completed</h1>
          <ul
            id="completed"
            ref={completedContainer}
            className={"flex flex-col gap-2 mt-2 w-full h-full"}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
          >
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.isCompleted && (
                    <li
                      key={task.id}
                      className={`border rounded-md p-2 cursor-pointer ${
                        task.isCompleted ? completedColor : pendingColor
                      }`}
                      onDrag={(event) => handleDrag(event, task.id)}
                      // onDragEnter={(event) => handleDragEnter(event)}
                      onDragLeave={(event) => handleDragLeave(event)}
                      draggable={true}
                    >
                      <div className="flex gap-2 justify-between">
                        <h2 className="text-slate-800 font-bold select-none">
                          {task.title}
                        </h2>
                        {newAdded && newAddedTask(task.id, task.date)}
                      </div>
                      <p className="text-slate-800 select-none pointer-events-none break-words">
                        {task.description}
                      </p>
                    </li>
                  )
              )}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Main;
