import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
      "https://devlab-backend-4d8f.onrender.com/Backend/api/user/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        company: "",
      });

      setTimeout(() => {
        navigate("/user/login");
      }, 1500);
    } catch (error) {
      console.error("User registration failed:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-register-page">
      <div className="user-register-container">

        <div className="user-register-card">

          <div className="user-register-header">
            <h1>Create Account</h1>
            <p>Join DevLab and manage your projects easily</p>
          </div>

          {error && (
            <div className="user-register-error">
              {error}
            </div>
          )}

          {success && (
            <div className="user-register-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="user-form-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="user-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="user-form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="user-form-group">
              <label>Phone</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="user-form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="user-register-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <div className="user-register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/user/login">
                Login
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserRegister;