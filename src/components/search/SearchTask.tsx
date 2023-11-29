import { NavLink } from "react-router-dom";

const SearchTask = () => {
  return (
    <div className="flex gap-2 justify-center">
      <input
        type="text"
        placeholder="Search tasks"
        className="border rounded p-1 focus:border-slate-900"
      />
      <NavLink to="tasks/create">
        <button className="border rounded bg-white p-1 shadow-sm hover:border-slate-800 hover:text-slate-800 text-slate-500">
          New
        </button>
      </NavLink>
    </div>
  );
};

export default SearchTask;
