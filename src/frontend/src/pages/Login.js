import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const dummyUsers = {
  student: { email: "student@example.com", password: "student123" },
  organization: { email: "org@example.com", password: "org123" },
  admin: { email: "admin@example.com", password: "admin123" },
};

const Login = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = dummyUsers[role];

    if (email === user.email && password === user.password) {
      alert(`Login successful as ${role}!`);
      if (role === "student") {
        navigate("/register-student");
      } else if (role === "organization") {
        navigate("/register-org");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Select Role
          </label>
          <select
            id="role"
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="organization">Organization</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          Don't have an account? Sign up as{" "}
          <Link to="/register-student">Student</Link> or{" "}
          <Link to="/register-org">Organization</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
