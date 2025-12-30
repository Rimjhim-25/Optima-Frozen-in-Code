// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CalendarBooking from "./pages/CalendarBooking.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* role-based login: /login/student, /login/faculty, /login/admin */}
      <Route path="/login/:role" element={<Login />} />

      {/* role-based dashboards */}
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/faculty/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/:role/calendar" element={<CalendarBooking />} />
       <Route path="/:role/resources" element={<ResourcesPage />} />
    </Routes>
  );
};

export default App;
