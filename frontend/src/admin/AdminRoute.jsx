
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const checkAuthentication = async () => {

      try {

        const response = await fetch(
          "https://devlab-backend-4d8f.onrender.com/Backend/api/auth/check",
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

        setAuthenticated(
          data.authenticated === true
        );

      } catch (error) {

        console.error(
          "Authentication check failed:",
          error
        );

        setAuthenticated(false);

      } finally {

        setChecking(false);

      }
    };

    checkAuthentication();

  }, []);

  if (checking) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-empty-state">
            <p>Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminRoute;
