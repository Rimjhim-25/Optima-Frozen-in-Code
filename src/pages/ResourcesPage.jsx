import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResourcesPage.css";

const ResourcesPage = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  // demo data – replace later with API data
  const rooms = [
    { name: "Room 101", capacity: 40, type: "Lecture", status: "Available" },
    { name: "Room 204", capacity: 30, type: "Lab", status: "Booked" },
    { name: "Room 204", capacity: 30, type: "Lab", status: "Booked" },
    { name: "Auditorium", capacity: 200, type: "Seminar", status: "Available" },
    { name: "Conference Hall", capacity: 100, type: "Meeting", status: "Under maintenance" },
  ];

  const faculty = [
    { name: "Dr. A. Sharma", dept: "CSE", courses: 3 },
    { name: "Prof. R. Gupta", dept: "EE", courses: 2 },
    { name: "Prof. R. Raghav", dept: "CSE", courses: 2 },
    { name: "Prof. s. sandip", dept: "AIML", courses: 2 },
    { name: "Prof. N. Kumar", dept: "ECE", courses: 2 },
  ];

  const equipments = [
    { name: "Projectors", total: 25, inUse: 18 },
    { name: "Microscpes", total: 30, inUse: 17 },
    { name: "Halogen", total: 60, inUse: 47 },
    { name: "Speakers", total: 20, inUse: 17 },
    { name: "Macbook", total: 50, inUse: 47 },
  ];

  const labs = [
    { name: "Computer Lab A", pcs: 60, status: "Available" },
    { name: "Electronics Lab", pcs: 35, status: "Under maintenance" },
    { name: "Graphics Lab", pcs: 25, status: "Booked" },
    { name: "Chemistry Lab", pcs: 15, status: "Available" },
    { name: "Physics Lab", pcs: 33, status: "Under maintenance" },
    { name: "Data Structure Lab", pcs: 12, status: "Under maintenance" },
  ];

  const courses = [
    { code: "CSE101", title: "Data Structures", dept: "CSE", students: 120 },
    { code: "MAT201", title: "Discrete Mathematics", dept: "Maths", students: 90 },
    { code: "PHY301", title: "Physics II", dept: "Physics", students: 75 },
    { code: "CHE401", title: "Organic Chemistry", dept: "Chemistry", students: 60 },
    { code: "ECE501", title: "Digital Electronics", dept: "ECE", students: 80 },
  ];

  return (
    <div className="res-root">
      <header className="res-header">
        <button
          className="res-back"
          onClick={() => navigate(`/${role}/dashboard`)}
        >
          ← Back to Dashboard
        </button>
        <h1>Resources</h1>
        <p className="res-sub">
          Overview of rooms, faculty, equipment, labs and courses.
        </p>
      </header>

      <main className="res-main">
        {/* left column */}
        <section className="res-column">
          <div className="res-card">
            <h2>Rooms</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.type}</td>
                    <td>{r.capacity}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="res-card">
            <h2>Faculty</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Courses</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.name}>
                    <td>{f.name}</td>
                    <td>{f.dept}</td>
                    <td>{f.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="res-card">
            <h2>Equipment</h2>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Total</th>
                  <th>In use</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((e) => (
                  <tr key={e.name}>
                    <td>{e.name}</td>
                    <td>{e.total}</td>
                    <td>{e.inUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* right column */}
        <section className="res-column">
          <div className="res-card">
            <h2>Labs</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Systems</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((l) => (
                  <tr key={l.name}>
                    <td>{l.name}</td>
                    <td>{l.pcs}</td>
                    <td>{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="res-card">
            <h2>Courses &amp; Enrollment</h2>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Dept</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.code}>
                    <td>{c.code}</td>
                    <td>{c.title}</td>
                    <td>{c.dept}</td>
                    <td>{c.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResourcesPage;
