import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          "https://devlab-backend-4d8f.onrender.com/Backend/api/user/auth/check",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setAuthenticated(false);
          return;
        }

        const data = await response.json();

        setAuthenticated(data.authenticated === true);

        // Keep localStorage information synchronized
        if (data.authenticated === true) {
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email);
        }
      } catch (error) {
        console.error("User authentication check failed:", error);
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuthentication();
  }, []);

  if (checking) {
    return (
      <div className="user-page">
        <div className="user-container">
          <div className="user-loading">
            <p>Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
}

export default UserRoute;