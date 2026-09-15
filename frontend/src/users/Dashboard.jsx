import { NavLink } from "react-router-dom";
import "../styles/user-dashboard.css";
function UserDashboard() {
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="user-dashboard">

      {/* ==============================
          WELCOME SECTION
      =============================== */}
      <div className="user-dashboard-welcome">

        <div>
          <span className="user-dashboard-label">
            CLIENT PORTAL
          </span>

          <h2>
            Welcome back, {userName}
          </h2>

          <p>
            Track your projects, tasks, payments, and updates
            from your DevLab workspace.
          </p>
        </div>

        <NavLink
          to="/user/projects"
          className="user-dashboard-primary-button"
        >
          View Projects
        </NavLink>

      </div>


      {/* ==============================
          OVERVIEW CARDS
      =============================== */}
      <div className="user-dashboard-grid">

        <NavLink
          to="/user/projects"
          className="user-dashboard-card"
        >
          <div className="user-dashboard-card-icon">
            ▣
          </div>

          <div>
            <h3>Projects</h3>
            <p>View and track your projects</p>
          </div>

          <span className="user-dashboard-card-arrow">
            →
          </span>
        </NavLink>


        <NavLink
          to="/user/tasks"
          className="user-dashboard-card"
        >
          <div className="user-dashboard-card-icon">
            ✓
          </div>

          <div>
            <h3>Tasks</h3>
            <p>Check your project tasks</p>
          </div>

          <span className="user-dashboard-card-arrow">
            →
          </span>
        </NavLink>


        <NavLink
          to="/user/payments"
          className="user-dashboard-card"
        >
          <div className="user-dashboard-card-icon">
            ₹
          </div>

          <div>
            <h3>Payments</h3>
            <p>View your payment history</p>
          </div>

          <span className="user-dashboard-card-arrow">
            →
          </span>
        </NavLink>


        <NavLink
          to="/user/notifications"
          className="user-dashboard-card"
        >
          <div className="user-dashboard-card-icon">
            ●
          </div>

          <div>
            <h3>Notifications</h3>
            <p>Check your latest updates</p>
          </div>

          <span className="user-dashboard-card-arrow">
            →
          </span>
        </NavLink>

      </div>


      {/* ==============================
          RECENT ACTIVITY
      =============================== */}
      <div className="user-dashboard-section">

        <div className="user-dashboard-section-header">

          <div>
            <h3>Recent Activity</h3>
            <p>Your latest DevLab updates</p>
          </div>

          <NavLink to="/user/notifications">
            View All
          </NavLink>

        </div>


        <div className="user-dashboard-empty">

          <div className="user-dashboard-empty-icon">
            ✓
          </div>

          <h4>No recent activity</h4>

          <p>
            Your project updates and notifications will
            appear here.
          </p>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;