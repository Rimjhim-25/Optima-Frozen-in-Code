import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams, useNavigate } from "react-router-dom";
import "./CalendarBooking.css";

const RESOURCE_GROUPS = [
  {
    label: "Rooms",
    options: ["Room 101", "Room 102", "Room 103", "Room 104"],
  },
  {
    label: "Computer Labs",
    options: ["Lab A", "Lab B", "Lab C"],
  },
  {
    label: "Library Spaces",
    options: ["Reading Hall 1", "Reading Hall 2", "Discussion Room"],
  },
];

const CalendarBooking = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    resource: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) return alert("Please pick a date on the calendar.");

    console.log("Booking request:", {
      date: selectedDate,
      ...formData,
    });

    alert(`Booking requested for ${selectedDate}`);
    setFormData({ resource: "", startTime: "", endTime: "", purpose: "" });
  };

  return (
    <div className="cb-root">
      {/* simple top bar to go back */}
      <header className="cb-header">
        <button
  className="cb-back"
  onClick={() => navigate(`/${role}/dashboard`)}
>
  ← Back to Dashboard
</button>

        <h1>Calendar &amp; Booking</h1>
      </header>

      <main className="cb-main">
        <section className="cb-calendar-panel">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            selectable={true}
            height="100%"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
          />
        </section>

        <section className="cb-form-panel">
          <h2>Booking Details</h2>
          <p className="cb-selected-date">
            Selected date:{" "}
            <strong>{selectedDate || "Click a date on the calendar"}</strong>
          </p>

          <form onSubmit={handleSubmit} className="cb-form">
            <label>
              Resource
              <select
  name="resource"
  value={formData.resource}
  onChange={handleChange}
  required
>
  <option value="">Select resource</option>

  {RESOURCE_GROUPS.map((group) => (
    <optgroup key={group.label} label={group.label}>
      {group.options.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </optgroup>
  ))}
</select>

            </label>

            <div className="cb-inline">
              <label>
                Start time
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                End time
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label>
              Purpose
              <textarea
                name="purpose"
                rows="3"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g. Study group, exam prep, seminar..."
                required
              />
            </label>

            <button type="submit" className="cb-submit">
              Submit booking request
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CalendarBooking;
