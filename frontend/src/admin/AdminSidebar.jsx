
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      navigate("/admin/login");
      onClose();
    }
  };

  const handleNavigation = () => {
    // Close sidebar on mobile after clicking a link
    onClose();
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>

      {/* Logo */}
      <div className="admin-sidebar-logo">

        <div className="admin-logo-text">
          Dev<span>Lab</span>
        </div>

        <p>Admin Panel</p>

      </div>


      {/* Navigation */}
      <nav className="admin-navigation">

        <p className="admin-nav-title">
          MAIN MENU
        </p>


        <NavLink
          to="/admin/dashboard"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/admin/leads"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◉</span>
          <span>Leads</span>
        </NavLink>


        <NavLink
          to="/admin/projects"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">▣</span>
          <span>Projects</span>
        </NavLink>


        <NavLink
          to="/admin/tasks"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">✓</span>
          <span>Tasks</span>
        </NavLink>


        <p className="admin-nav-title">
          MANAGEMENT
        </p>


        <NavLink
          to="/admin/services"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">⚙</span>
          <span>Services</span>
        </NavLink>


        <NavLink
          to="/admin/portfolio"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">▧</span>
          <span>Portfolio</span>
        </NavLink>


        <NavLink
          to="/admin/payments"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">₹</span>
          <span>Payments</span>
        </NavLink>


        <NavLink
          to="/admin/testimonials"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">★</span>
          <span>Testimonials</span>
        </NavLink>


        {/* Public Contact Messages */}
        <NavLink
          to="/admin/messages"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">✉</span>
          <span>Messages</span>
        </NavLink>


        {/* Client Messages */}
        <NavLink
          to="/admin/client-messages"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">💬</span>
          <span>Client Messages</span>
        </NavLink>


        <p className="admin-nav-title">
          SYSTEM
        </p>


        <NavLink
          to="/admin/settings"
          onClick={handleNavigation}
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

      </nav>


      {/* Bottom */}
      <div className="admin-sidebar-bottom">

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          <span className="nav-icon">↪</span>
          <span>Logout</span>
        </button>


        <NavLink
          to="/"
          className="admin-view-site"
          onClick={handleNavigation}
        >
          <span className="nav-icon">↗</span>
          <span>View Website</span>
        </NavLink>

      </div>

    </aside>
  );
}

export default AdminSidebar;
