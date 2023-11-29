import Profile from "./profile/Profile";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-5 border-y">
      <div className="flex flex-row gap-2 items-center">
        <h2 className="text-slate-50"></h2>
      </div>
      <Profile></Profile>
    </nav>
  );
};

export default Navbar;
