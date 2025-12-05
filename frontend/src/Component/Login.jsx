import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // ✅ needed for redirect

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // clear field-level error while typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // clear global error if any
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          data.message || "Login failed. Please check your credentials.";
        setErrors((prev) => ({ ...prev, form: message }));
        return;
      }

      // ✅ store token in localStorage if backend sends it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Optional: store user info too
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Login successful!");
      navigate("/"); // ✅ redirect to landing page
    } catch (err) {
      console.error("Login failed:", err);
      setErrors((prev) => ({
        ...prev,
        form: "Server unreachable. Please try again later.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        {errors.form && <p className="error-msg">{errors.form}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`login-input ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="login-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`login-input ${errors.password ? "input-error" : ""}`}
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="login-helper">
          New to EventEase?
          <br />
          <Link to="/signup" className="create-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
