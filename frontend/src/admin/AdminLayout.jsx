
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Area */}
      <div className="admin-main">

        {/* Header */}
        <AdminHeader
          onMenuClick={toggleSidebar}
        />

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

    </div>
  );
}

export default AdminLayout;
