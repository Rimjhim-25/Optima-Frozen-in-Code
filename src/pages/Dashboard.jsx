// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import { EnrollmentChart, TraineeChart } from "../components/DashboardChart.jsx";
import { useNavigate, useParams } from "react-router-dom";




const statCards = [
  {
    label: "Total Rooms",
    valueKey: "totalRooms",
    fallback: 45,
    delta: "+2 this month",
    colorClass: "card-blue",
  },
  {
    label: "Equipment Items",
    valueKey: "equipmentItems",
    fallback: 120,
    delta: "+8 this month",
    colorClass: "card-purple",
  },
  {
    label: "Library Books",
    valueKey: "libraryBooks",
    fallback: 850,
    delta: "+45 this month",
    colorClass: "card-green",
  },
  {
    label: "Active Bookings",
    valueKey: "activeBookings",
    fallback: 127,
    delta: "-3 from yesterday",
    colorClass: "card-orange",
  },
];
const UPCOMING_EVENTS = [
  {
    id: 1,
    weekday: "Friday",
    day: "2",
    month: "Jan",
    badge: "In 3 days",
    title: "College President Elections",
    time: "11:00 AM - 12:30 PM",
  },
  {
    id: 2,
    weekday: "Monday",
    day: "5",
    month: "Jan",
    badge: "In 6 days",
    title: "Special Guest Lecture on AI Innovations",
    time: "11:00 AM - 12:30 PM",
  },
  {
    id: 3,
    weekday: "Friday",
    day: "9",
    month: "Jan",
    badge: "In 10 days",
    title: "Webinar on Career Trends for Batch 2027",
    time: "01:00 PM - 02:30 PM",
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
    const navigate = useNavigate();
  const { role } = useParams()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosClient.get("/dashboard/stats");
        setStats(data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return null; // or show a loader

  return (
    <div className="dash-root">
      {/* Top navbar */}
      <header className="dash-header">
        <div className="dash-header-left">
          <div className="dash-logo">O</div>
          <div>
            <div className="dash-title">OPTIMA</div>
            <div className="dash-subtitle">
              College Management System 
            </div>
          </div>
        </div>

     <nav className="dash-nav">
  <button className="dash-nav-item dash-nav-item--active">
    Dashboard
  </button>
  <button
    className="dash-nav-item"
    onClick={() => navigate(`/${role}/calendar`)}
  >
    Calendar &amp; Booking
  </button>
   <button
    className="dash-nav-item"
    onClick={() => navigate(`/${role}/resources`)}
  >
    Resources
  </button>
</nav>


        <div className="dash-header-right">
          <div className="dash-role">
            <span>Role:</span>
            <select>
              <option>{user?.role ?? "Admin"}</option>
            </select>
          </div>
          <button className="dash-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="dash-main">
        {/* Gradient performance banner */}
        <section className="dash-hero">
          <div className="dash-hero-left">
            <h2>System Performance</h2>
            <p>
              All success metrics are being met. System is operating
              optimally.
            </p>
          </div>

          <div className="dash-hero-right">
            <div className="dash-hero-metric">
              <span className="dash-hero-label">Avg. Booking Time</span>
              <span className="dash-hero-value">
                {stats.avgBookingTime ?? "1.8 min"}
              </span>
            </div>
            <div className="dash-hero-metric">
              <span className="dash-hero-label">Scheduling Conflicts</span>
              <span className="dash-hero-value">
                {stats.schedulingConflicts ?? 0}
              </span>
            </div>
            <div className="dash-hero-metric">
              <span className="dash-hero-label">Dashboard Load Time</span>
              <span className="dash-hero-value">
                {stats.dashboardLoadTime ?? "1.2 sec"}
              </span>
            </div>
            <div className="dash-hero-metric">
              <span className="dash-hero-label">Resources Supported</span>
              <span className="dash-hero-value">
                {stats.resourcesSupported ?? 4}
              </span>
            </div>
          </div>
        </section>

        {/* Stat cards */}
        <section className="dash-card-grid">
          {statCards.map((card) => (
            <div
              key={card.label}
              className={`dash-card ${card.colorClass}`}
            >
              <div className="dash-card-content">
                <div>
                  <div className="dash-card-label">{card.label}</div>
                  <div className="dash-card-value">
                    {stats[card.valueKey] ?? card.fallback}
                  </div>
                  <div className="dash-card-delta">{card.delta}</div>
                </div>
                <div className="dash-card-icon">↑</div>
              </div>
            </div>
          ))}
        </section>

      {/* Charts area like reference design */}
<section className="dash-charts-grid">
  {/* Enrollment Situation (horizontal bar) */}
  <div className="dash-panel">
    <div className="dash-panel-header">
      <h3>Enrollment Situation</h3>
    </div>
    <div className="dash-panel-body dash-chart">
      <EnrollmentChart dataFromApi={stats.enrollment} />
    </div>
  </div>

  {/* Number of Trainees (area / line) */}
  <div className="dash-panel">
    <div className="dash-panel-header">
      <h3>Number of Trainees</h3>
      <div className="dash-small-meta">
        <span>Total Number</span>
        <strong>780</strong>
      </div>
    </div>
    <div className="dash-panel-body dash-chart">
      <TraineeChart dataFromApi={stats.trainees} />
    </div>
  </div>

  {/* Training Program mini card */}
  <div className="dash-panel dash-panel-small">
    <div className="dash-panel-header">
      <h3>Training Program</h3>
    </div>
    <div className="dash-panel-body">
      <div className="dash-training-number">1,970</div>
      <div className="dash-training-sub">
        Number of downloads today
      </div>
      <div className="dash-training-change">
        0.7% <span>▲</span>
      </div>
      <button className="dash-download-btn">Download</button>
    </div>
  </div>
</section>
<section className="dash-insights">
  <div className="dash-panel dash-insights-panel">
    <div className="dash-insights-header">
      <h3>Smart Insights</h3>
      <span className="dash-insights-tag">Auto‑generated from usage data</span>
    </div>
    <div className="dash-insights-grid">
      <div className="dash-insight">
        <span className="dash-insight-label">Room utilization</span>
        <p className="dash-insight-text">
          Rooms are 82% occupied today. Next free slot is at <strong>2:30 PM</strong>.
        </p>
      </div>
      <div className="dash-insight">
        <span className="dash-insight-label">Library activity</span>
        <p className="dash-insight-text">
          Book issues increased by <strong>12%</strong> compared to last week.
        </p>
      </div>
      <div className="dash-insight">
        <span className="dash-insight-label">Peak booking time</span>
        <p className="dash-insight-text">
          Most bookings occur between <strong>11:00 AM – 1:00 PM</strong>.
        </p>
      </div>
      <div className="dash-insight">
        <span className="dash-insight-label">Popular resource</span>
        <p className="dash-insight-text">
          <strong>Computer Lab A</strong> is the most requested resource this month.
        </p>
      </div>
    </div>
  </div>
</section>
<section className="dash-focus-row">
  {/* Focus card on the left */}
  <div className="dash-panel dash-focus-panel">
    <div className="dash-focus-header">
      <h3>Focus for Today</h3>
      <span className="dash-focus-tag">Personal study suggestion</span>
    </div>

    <div className="dash-focus-main">
      <div className="dash-focus-left">
        <p className="dash-focus-title">
          Revise Data Structures notes &amp; plan next week’s lab session
        </p>
        <p className="dash-focus-meta">
          Estimated time: <strong>45 mins</strong> · Best slot: <strong>4:00 – 4:45 PM</strong>
        </p>
      </div>

      <div className="dash-focus-right">
        <label className="dash-focus-toggle">
          <input type="checkbox" />
          <span className="dash-focus-toggle-pill" />
          <span className="dash-focus-toggle-text">Mark as done</span>
        </label>
        <button className="dash-focus-cta">Open planner</button>
      </div>
    </div>
  </div>


{/* Upcoming events */}
<div className="dash-events-wrapper">
  <div className="dash-panel dash-events-panel">
    <div className="dash-panel-header">
      <h3>Upcoming Events</h3>
    </div>

    <div className="dash-events-list">
      {UPCOMING_EVENTS.map((ev) => (
        <article key={ev.id} className="dash-event-card">
          <div className="dash-event-date">
            <span className="dash-event-weekday">{ev.weekday}</span>
            <div className="dash-event-daybox">
              <span className="dash-event-day">{ev.day}</span>
              <span className="dash-event-month">{ev.month}</span>
            </div>
          </div>

          <div className="dash-event-main">
            <div className="dash-event-top">
              <span className="dash-event-title">{ev.title}</span>
              <span className="dash-event-badge">{ev.badge}</span>
            </div>
            <div className="dash-event-time">
              <span className="dash-event-clock">🕒</span>
              <span>{ev.time}</span>
            </div>
          </div>
        </article>
      ))}
    </div>

    <button className="dash-events-more">View More</button>
  </div>
</div>
</section>
<section className="dash-right-grid">
  <div className="dash-panel dash-schedule-panel">
    <div className="dash-panel-header">
      <h3>Today's Schedule</h3>
    </div>
    <ul className="dash-schedule-list">
      <li>
        <span className="dash-schedule-time">09:00 – 10:30</span>
        <span className="dash-schedule-text">Data Structures · Room 101</span>
      </li>
      <li>
        <span className="dash-schedule-time">11:00 – 12:00</span>
        <span className="dash-schedule-text">Library Slot · Reading Hall 1</span>
      </li>
      <li>
        <span className="dash-schedule-time">02:00 – 03:30</span>
        <span className="dash-schedule-text">Project Meeting · Lab A</span>
      </li>
    </ul>
    <button className="dash-events-more">View all bookings</button>
  </div>
  <div className="dash-panel dash-quick-panel">
    <div className="dash-panel-header">
      <h3>Resource Snapshot</h3>
    </div>
    <ul className="dash-quick-list">
      <li>
        <span className="dash-quick-label">Rooms in use</span>
        <span className="dash-quick-value">18 / 45</span>
      </li>
      <li>
        <span className="dash-quick-label">Active bookings today</span>
        <span className="dash-quick-value">27</span>
      </li>
      <li>
        <span className="dash-quick-label">Library books issued</span>
        <span className="dash-quick-value">312</span>
      </li>
      <li>
        <span className="dash-quick-label">Equipment check‑outs</span>
        <span className="dash-quick-value">41</span>
      </li>
    </ul>
  </div>
  {/* existing Upcoming Events panel */}
  <div className="dash-panel dash-events-panel">
    {/* ...your Upcoming Events JSX... */}
  </div>
</section>

      </main>
    </div>
  );
};

export default Dashboard;
