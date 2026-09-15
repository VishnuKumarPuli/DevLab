import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://devlab-backend-4d8f.onrender.com/api/user/auth/login",
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
        setError(data.message || "Invalid email or password");
        return;
      }

      // Store basic user information
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);

      navigate("/user/dashboard");
    } catch (error) {
      console.error("User login failed:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-page">
      <div className="user-login-container">

        <div className="user-login-card">

          <div className="user-login-header">
            <h1>Welcome Back</h1>
            <p>Login to access your DevLab dashboard</p>
          </div>

          {error && (
            <div className="user-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="user-login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="user-login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/user/register">
                Create Account
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserLogin;