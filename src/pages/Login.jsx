import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const roleLabels = {
  student: "Student",
  faculty: "Faculty",
  admin: "Admin",
};

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const { email, password } = form;

  try {
   const { data } = await axiosClient.post("/auth/login", {
      email,
      password,
      role,           // from useParams() → "student" | "faculty" | "admin"
    });


    login(data);
    navigate(`/${role}/dashboard`);
  } catch (err) {
    const msg = err.response?.data?.message;

    // only auto-register if backend says user not found
    if (err.response?.status === 400 && msg === "User not found") {
      try {
        const { data } = await axiosClient.post("/auth/register", {
          name: email.split("@")[0],
          email,
          password,
          role,
        });

        login(data);
        navigate(`/${role}/dashboard`);
      } catch (regErr) {
        setError(regErr.response?.data?.message || "Registration failed");
      }
    } else {
      // for existing users with wrong password, etc.
      setError(msg || "Login failed");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="app-shell flex-center">
      <div className="card" style={{ maxWidth: 420, width: "100%" }}>
        <Link to="/" style={{ fontSize: 12, color: "#4f46e5" }}>
          ← Back to role selection
        </Link>
        <h2 style={{ marginTop: 16, fontSize: 24 }}>
          {roleLabels[role]} Login
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
          Sign in with your institutional email to access the dashboard.
        </p>

        {error && (
          <div
            style={{
              marginBottom: 12,
              fontSize: 13,
              color: "#b91c1c",
              background: "#fee2e2",
              padding: "8px 10px",
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 14,
                marginTop: 4,
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 14,
                marginTop: 4,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              width: "100%",
              background: "#4f46e5",
              color: "#fff",
              fontWeight: 500,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

