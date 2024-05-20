import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-[10dvh] bg-slate-200/50">
      <ul className="flex items-center justify-center gap-x-4 h-full font-semibold text-gray-700 text-xl">
        <li className="hover:text-black transition">
          <Link to="/">Task List</Link>
        </li>
        <li className="hover:text-black transition">
          <Link to="/new-task">New Task</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
