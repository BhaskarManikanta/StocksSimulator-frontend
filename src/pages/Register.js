import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/api/stockApi";
import { login } from "../features/auth/authSlice";
import "./Auth.css";

const Register = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await registerUser(form);
      // Backend returns token + email
      dispatch(login({ token: res.data.token, email: form.email }));
      alert("Registration Successful")
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
      setForm({
        email:'',
        password:''
      })
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>📝 Create Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="switch-auth">
          Already have an account?{" "}
          <span onClick={onSwitchToLogin}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
