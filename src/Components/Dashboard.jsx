import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../../src/assets/logo.png'
import {
  MdCalendarToday,
  MdAnalytics,
  MdGroup,
  MdSettings,
  MdHelp,
  MdLogout,
  MdSearch,
  MdEmail,
  MdNotifications,
  MdAdd,
  MdUpload,
  MdArrowOutward,
  MdPause,
  MdStop,
  MdVideocam,
  MdPhoneIphone,
  MdCheckCircle,
  MdCircle,
  MdTask,
  MdDashboard,
  MdMenu,
} from "react-icons/md";
import { FiPlus } from "react-icons/fi";

const Avatar = ({ name = "", size = 8 }) => {
  const colors = [
    "bg-pink-400",
    "bg-orange-400",
    "bg-violet-400",
    "bg-sky-400",
    "bg-emerald-400",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-${size} h-${size} rounded-full ${colors[idx]} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const s = (status || "").toLowerCase();
  if (s === "completed" || s === "complete")
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold whitespace-nowrap">
        Completed
      </span>
    );
  if (s === "in progress" || s === "inprogress" || s === "active")
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold whitespace-nowrap">
        In Progress
      </span>
    );
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold whitespace-nowrap">
      Pending
    </span>
  );
};

const BarChart = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const heights = [55, 80, 72, 95, 60, 45, 50];
  const active = 3;
  const green2 = 1;

  return (
    <div className="w-full mt-4">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <pattern
            id="diagonalStripe"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <rect width="6" height="6" fill="#f3f4f6" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#d1d5db" strokeWidth="2.5" />
          </pattern>
        </defs>
      </svg>

      <div className="flex items-end gap-2" style={{ height: "140px" }}>
        {days.map((d, i) => {
          const barHeight = `${heights[i]}%`;
          const isActive = i === active;
          const isGreen2 = i === green2;
          const isStripe = !isActive && !isGreen2;

          return (
            <div
              key={i}
              className="flex flex-col items-center flex-1"
              style={{ height: "100%" }}
            >
              <div className="flex-1 flex flex-col justify-end items-center w-full">
                {isActive && (
                  <span className="text-[10px] text-gray-500 font-semibold mb-1">
                    74%
                  </span>
                )}
                {isStripe ? (
                  <svg
                    width="100%"
                    height={barHeight}
                    viewBox="0 0 30 100"
                    preserveAspectRatio="none"
                    style={{ display: "block", borderRadius: "999px", overflow: "hidden" }}
                  >
                    <rect
                      x="0" y="0" width="30" height="100"
                      rx="15" ry="15"
                      fill="url(#diagonalStripe)"
                    />
                  </svg>
                ) : (
                  <div
                    className="w-full rounded-full"
                    style={{
                      height: barHeight,
                      backgroundColor: isActive ? "#1a5c3a" : "#2d8a5e",
                    }}
                  />
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1">{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SemiCircle = ({ pct = 41 }) => {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circumference = Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <svg width="180" height="100" viewBox="0 0 180 100">
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none"
        stroke="#1a5c3a"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        style={{ fontSize: 22, fontWeight: 700, fill: "#111" }}
      >
        {pct}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        style={{ fontSize: 10, fill: "#6b7280" }}
      >
        Project Ended
      </text>
    </svg>
  );
};

const SidebarContent = () => (
  <>
    <div className="flex items-center gap-2 px-2">
        <img src={logo} alt="" />
      {/* <div className="w-8 h-8 rounded-full bg-[#1a5c3a] flex items-center justify-center">
        <MdCircle className="text-white text-xs" />
      </div> */}
      <span className="font-bold text-lg text-gray-800">Donezo</span>
    </div>

    <div>
      <p className="text-[10px] text-gray-400 font-semibold px-2 mb-2 tracking-widest">
        MENU
      </p>
      <nav className="flex flex-col gap-1">
        {[
          { icon: <MdDashboard />, label: "Dashboard", active: true },
          { icon: <MdTask />, label: "Tasks", badge: "12+" },
          { icon: <MdCalendarToday />, label: "Calendar" },
          { icon: <MdAnalytics />, label: "Analytics" },
          { icon: <MdGroup />, label: "Team" },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              item.active
                ? "bg-[#1a5c3a] text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className="ml-auto text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>

    <div>
      <p className="text-[10px] text-gray-400 font-semibold px-2 mb-2 tracking-widest">
        GENERAL
      </p>
      <nav className="flex flex-col gap-1">
        {[
          { icon: <MdSettings />, label: "Settings" },
          { icon: <MdHelp />, label: "Help" },
          { icon: <MdLogout />, label: "Logout" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all"
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>

    <div className="mt-auto bg-[#1a5c3a] rounded-2xl p-4 text-white">
      <MdPhoneIphone className="text-2xl mb-2" />
      <p className="text-xs font-bold">
        Download our <br /> Mobile App
      </p>
      <p className="text-[10px] opacity-70 mt-1">Get easy in another way</p>
      <button className="mt-3 bg-[#2d8a5e] hover:bg-[#3aab74] text-white text-xs font-semibold px-4 py-1.5 rounded-lg w-full transition-all">
        Download
      </button>
    </div>
  </>
);

export default function Dashboard() {
  const [totalProjects, setTotalProjects] = useState(null);
  const [users, setUsers] = useState([]);
  const [time, setTime] = useState(5048);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://task-api-eight-flax.vercel.app/api/products")
      .then((res) => {
        const data = res.data;
        const arr = Array.isArray(data) ? data : data.data || data.products || [];
        setTotalProjects(arr.length);
      })
      .catch(() => setTotalProjects("--"));
  }, []);

  useEffect(() => {
    axios
      .get("https://task-api-eight-flax.vercel.app/api/users")
      .then((res) => {
        const data = res.data;
        const arr = Array.isArray(data) ? data : data.data || data.users || [];
        setUsers(arr.slice(0, 4));
      })
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const projects = [
    { name: "Develop API Endpoints", due: "Nov 26, 2024" },
    { name: "Onboarding Flow", due: "Nov 28, 2024" },
    { name: "Build Dashboard", due: "Nov 30, 2024" },
    { name: "Optimize Page Load", due: "Dec 5, 2024" },
    { name: "Cross-Browser Testing", due: "Dec 6, 2024" },
  ];

  const projectColors = [
    "bg-blue-400",
    "bg-orange-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];

  const statCards = [
    { label: "Ended Projects", value: 10, note: "Increased from last month" },
    { label: "Running Projects", value: 12, note: "Increased from last month" },
    { label: "Pending Project", value: 2, note: "On Discuss" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-30 top-0 left-0 h-full w-56 bg-white flex flex-col py-6 px-4 gap-6 flex-shrink-0 shadow-sm transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white px-4 md:px-6 py-3 flex items-center gap-3 flex-shrink-0 border-b border-gray-100">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu className="text-gray-600 text-xl" />
          </button>

          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 flex-1 max-w-sm">
            <MdSearch className="text-gray-400 flex-shrink-0" />
            <input
              className="bg-transparent text-sm outline-none flex-1 text-gray-600 min-w-0"
              placeholder="Search task"
            />
            <span className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-400 hidden sm:inline">
              F
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:flex">
              <MdEmail className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <MdNotifications className="text-gray-500" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar name="Totok" size={9} />
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-gray-800">Totok Michael</p>
                <p className="text-[10px] text-gray-400">tmichael20@mail.com</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Plan, prioritize, and accomplish your tasks with ease.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 bg-[#1a5c3a] text-white text-sm font-semibold px-3 md:px-4 py-2 rounded-xl hover:bg-[#154d30] transition-all">
                <MdAdd /> <span className="hidden sm:inline">Add Project</span>
              </button>
              <button className="flex items-center gap-2 border border-gray-200 text-sm font-semibold px-3 md:px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
                <MdUpload /> <span className="hidden sm:inline">Import Data</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
            <div className="bg-[#1a5c3a] text-white rounded-2xl p-4 md:p-5 flex flex-col gap-2 relative">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium opacity-80">Total Projects</p>
                <button className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center opacity-70 hover:opacity-100">
                  <MdArrowOutward className="text-sm" />
                </button>
              </div>
              <p className="text-4xl font-bold">
                {totalProjects === null ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  totalProjects
                )}
              </p>
              <p className="text-[11px] opacity-60 flex items-center gap-1">
                <MdArrowOutward className="text-xs" /> Increased from last month
              </p>
            </div>

            {statCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-4 md:p-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs md:text-sm font-medium text-gray-500">{card.label}</p>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 flex-shrink-0">
                    <MdArrowOutward className="text-sm" />
                  </button>
                </div>
                <p className="text-4xl font-bold text-gray-900">{card.value}</p>
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                  <MdArrowOutward className="text-xs text-green-500" />
                  {card.note}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4">
            <div className="bg-white rounded-2xl p-5">
              <p className="font-semibold text-gray-800">Project Analytics</p>
              <BarChart />
            </div>

            <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
              <p className="font-semibold text-gray-800 text-4xl">Reminders</p>
              <div>
                <p className="font-bold text-green-700 text-2xl">
                  Meeting with Arc Company
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Time : 02.00 pm - 04.00 pm
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 bg-[#1a5c3a] hover:bg-[#154d30] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all mt-auto">
                <MdVideocam />
                Start Meeting
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800">Project</p>
                <button className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-2 py-1 hover:bg-gray-50">
                  <FiPlus className="text-xs" /> New
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {projects.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg ${projectColors[i]} flex items-center justify-center flex-shrink-0`}
                    >
                      <MdTask className="text-white text-xs" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400">Due date: {p.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-800">Team Collaboration</p>
                <button className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-2 py-1 hover:bg-gray-50 whitespace-nowrap">
                  <FiPlus className="text-xs" /> Add Member
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {users.length === 0 ? (
                  <div className="flex justify-center py-4">
                    <span className="loading loading-spinner loading-sm text-[#1a5c3a]" />
                  </div>
                ) : (
                  users.map((u, i) => {
                    const name = u.name || u.username || u.fullName || `User ${i + 1}`;
                    const status = u.status || (i % 3 === 0 ? "completed" : i % 3 === 1 ? "in progress" : "pending");
                    const task = u.task || u.currentTask || "Working on project";
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar name={name} size={9} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{task}</p>
                        </div>
                        <StatusBadge status={status} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5">
              <p className="font-semibold text-gray-800 mb-2">Project Progress</p>
              <div className="flex justify-center mt-4">
                <SemiCircle pct={41} />
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MdCheckCircle className="text-[#1a5c3a]" /> Completed
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MdCircle className="text-gray-800" /> In Progress
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <MdCircle className="text-gray-300" /> Pending
                </span>
              </div>
            </div>

            <div className="bg-[#1a5c3a] rounded-2xl p-5 flex flex-col justify-between text-white md:col-span-2 lg:col-span-1">
              <p className="font-semibold text-base">Time Tracker</p>
              <p className="text-4xl font-bold tracking-widest text-center mt-4">
                {formatTime(time)}
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => {}}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <MdPause className="text-xl" />
                </button>
                <button
                  onClick={() => setTime(0)}
                  className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
                >
                  <MdStop className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}