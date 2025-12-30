import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "student",
    title: "Student",
    desc: "Access resources, book study rooms, and manage your schedule.",
  },
  {
    id: "faculty",
    title: "Faculty",
    desc: "Book resources, manage office hours, and view analytics.",
  },
  {
    id: "admin",
    title: "Admin",
    desc: "Full system access, manage resources, and view all analytics.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="app-shell flex-center">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#4f46e5",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: 28,
            }}
          >
            ▢
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Campus Resource Optimizer
          </h1>
          <p style={{ color: "#6b7280" }}>Select your role to continue</p>
        </div>

        <div className="grid grid-3">
          {roles.map((r) => (
            <button
              key={r.id}
              className="card"
              style={{ textAlign: "left", width: "100%" }}
              onClick={() => navigate(`/login/${r.id}`)}
            >
              <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                {r.title}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>{r.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;

