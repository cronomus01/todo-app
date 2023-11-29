import SearchTask from "./search/SearchTask";
import Tasks from "./tasks/Tasks";

const SideBar = () => {
  return (
    <aside
      className={`w-full h-full relative app-aside p-2 after:content-[''] after:bg-slate-200 after:w-[1px] after:absolute after:right-0 after:top-0 after:h-full after:z-[-1] py-10 isolate`}
    >
      <SearchTask></SearchTask>
      <Tasks></Tasks>
    </aside>
  );
};

// const SideBar = memo(SideBarComponent);

export default SideBar;
