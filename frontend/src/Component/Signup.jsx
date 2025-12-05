import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    adminCode: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  };

  // VALIDATION (same as before)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT → call backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone, // backend expects phoneNumber
          // if backend needs adminCode, add here as well
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // backend might send { message: "..."}
        const message =
          data.message || "Signup failed. Please check your details.";
        setErrors((prev) => ({ ...prev, form: message }));
        return;
      }

      alert("Signup successful!");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Signup error:", error);
      setErrors((prev) => ({
        ...prev,
        form: "Server unreachable. Please try again later."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        {errors.form && <p className="form-error">{errors.form}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-message">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Admin Code (optional – only local for now) */}
          <div className="form-group">
            <input
              type="text"
              name="adminCode"
              placeholder="Admin Code (Optional)"
              value={formData.adminCode}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="already-user">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
