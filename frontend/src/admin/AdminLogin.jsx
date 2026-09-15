import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://devlab-backend-4d8f.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      // Save login state
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      localStorage.setItem(
        "adminName",
        data.name
      );

      localStorage.setItem(
        "adminEmail",
        data.email
      );

      // Go to dashboard
      navigate("/admin/dashboard");

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        error.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-logo">
          Dev<span>Lab</span>
        </div>

        <h1>Admin Login</h1>

        <p>
          Login to manage your website
        </p>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) =>
                setPassword(e.target.value)
              }
              disabled={loading}
            />

          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <button
          type="button"
          className="back-website-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;