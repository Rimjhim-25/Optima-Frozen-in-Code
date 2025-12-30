// frontend/src/components/Navbar.jsx
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-xl">
            ⬛
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Campus Resource Optimizer
            </div>
            <div className="text-xs text-slate-400">
              Blizzard Ops · Developer Tools &amp; Productivity
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <button className="hover:text-indigo-600">Dashboard</button>
          <button className="hover:text-indigo-600">Calendar &amp; Booking</button>
          <button className="hover:text-indigo-600">Resources</button>
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={user?.role}
            disabled
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
          >
            <option value={user?.role}>
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </option>
          </select>
          <button
            onClick={logout}
            className="text-xs text-slate-500 hover:text-red-500"
          >
            Logout
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
            {user?.name?.[0]}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
