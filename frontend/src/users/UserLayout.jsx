import {
    useEffect,
    useState
} from "react";

import {
    Outlet,
    NavLink
} from "react-router-dom";

import {
    getUserNotifications
} from "../services/api";

function UserLayout() {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [notificationCount, setNotificationCount] =
        useState(0);


    // ==========================================
    // LOAD UNREAD NOTIFICATIONS
    // ==========================================

    const loadNotificationCount = async () => {

        try {

            const notifications =
                await getUserNotifications();

            if (Array.isArray(notifications)) {

                const unreadCount =
                    notifications.filter(
                        (notification) =>
                            !notification.isRead
                    ).length;

                setNotificationCount(
                    unreadCount
                );
            }

        } catch (error) {

            console.error(
                "Error loading notifications:",
                error
            );

        }
    };


    // ==========================================
    // LOAD WHEN USER DASHBOARD OPENS
    // ==========================================

    useEffect(() => {

        loadNotificationCount();

    }, []);
    useEffect(() => {

    const handleNotificationRead = () => {
        loadNotificationCount();
    };

    window.addEventListener(
        "notificationRead",
        handleNotificationRead
    );

    return () => {
        window.removeEventListener(
            "notificationRead",
            handleNotificationRead
        );
    };

}, []);


    return (
        <div className="user-layout">


            {/* ==============================
                MOBILE OVERLAY
            =============================== */}

            {sidebarOpen && (
                <div
                    className="user-sidebar-overlay"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                ></div>
            )}


            {/* ==============================
                SIDEBAR
            =============================== */}

            <aside
                className={`user-sidebar ${
                    sidebarOpen
                        ? "user-sidebar-open"
                        : ""
                }`}
            >


                {/* Logo */}

                <div className="user-sidebar-logo">

                    <div className="user-logo-mark">
                        D
                    </div>

                    <div>
                        <h2>DevLab</h2>

                        <span>
                            Client Portal
                        </span>
                    </div>

                </div>


                {/* Navigation */}

                <nav className="user-sidebar-nav">


                    {/* Dashboard */}

                    <NavLink
                        to="/user/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        <span className="user-nav-icon">
                            ⌂
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </NavLink>


                    {/* Projects */}

                    <NavLink
                        to="/user/projects"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        <span className="user-nav-icon">
                            ▣
                        </span>

                        <span>
                            Projects
                        </span>
                    </NavLink>


                    {/* Tasks */}

                    <NavLink
                        to="/user/tasks"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        <span className="user-nav-icon">
                            ✓
                        </span>

                        <span>
                            Tasks
                        </span>
                    </NavLink>


                    {/* Payments */}

                    <NavLink
                        to="/user/payments"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        <span className="user-nav-icon">
                            ₹
                        </span>

                        <span>
                            Payments
                        </span>
                    </NavLink>


                    {/* ==============================
                        NOTIFICATIONS
                    =============================== */}

                    <NavLink
                        to="/user/notifications"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >

                        <span className="user-nav-icon notification-nav-icon">

                            ●

                            {notificationCount > 0 && (
                                <span className="sidebar-notification-badge">

                                    {notificationCount > 99
                                        ? "99+"
                                        : notificationCount}

                                </span>
                            )}

                        </span>

                        <span>
                            Notifications
                        </span>

                    </NavLink>


                    {/* ==============================
                        MESSAGES
                    =============================== */}

                    <NavLink
                        to="/user/messages"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >

                        <span className="user-nav-icon">
                            💬
                        </span>

                        <span>
                            Messages
                        </span>

                    </NavLink>


                    {/* Profile */}

                    <NavLink
                        to="/user/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "user-nav-link active"
                                : "user-nav-link"
                        }
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >

                        <span className="user-nav-icon">
                            ○
                        </span>

                        <span>
                            Profile
                        </span>

                    </NavLink>

                </nav>


                {/* ==============================
                    SIDEBAR BOTTOM
                =============================== */}

                <div className="user-sidebar-bottom">

                    <div className="user-sidebar-help">

                        <span>
                            Need help?
                        </span>

                        <p>
                            Contact the DevLab team.
                        </p>

                        <NavLink
                            to="/contact"
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        >
                            Contact Support
                        </NavLink>

                    </div>

                </div>

            </aside>


            {/* ==============================
                MAIN AREA
            =============================== */}

            <div className="user-main">


                {/* ==============================
                    HEADER
                =============================== */}

                <header className="user-header">

                    <div className="user-header-left">

                        <button
                            className="user-menu-button"
                            onClick={() =>
                                setSidebarOpen(
                                    !sidebarOpen
                                )
                            }
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>

                        <div>

                            <h1>
                                Client Dashboard
                            </h1>

                            <p>
                                Manage your DevLab projects
                            </p>

                        </div>

                    </div>


                    <div className="user-header-right">


                        {/* ==============================
                            NOTIFICATION BELL
                        =============================== */}

                        <NavLink
                            to="/user/notifications"
                            className="user-header-icon notification-button"
                            aria-label="Notifications"
                        >

                            🔔

                            {notificationCount > 0 && (
                                <span className="notification-badge">

                                    {notificationCount > 99
                                        ? "99+"
                                        : notificationCount}

                                </span>
                            )}

                        </NavLink>


                        {/* ==============================
                            USER PROFILE
                        =============================== */}

                        <div className="user-header-profile">

                            <div className="user-avatar">

                                {(
                                    localStorage.getItem(
                                        "userName"
                                    ) || "U"
                                )
                                    .charAt(0)
                                    .toUpperCase()}

                            </div>


                            <div className="user-header-user-info">

                                <strong>
                                    {
                                        localStorage.getItem(
                                            "userName"
                                        ) || "User"
                                    }
                                </strong>

                                <span>
                                    {
                                        localStorage.getItem(
                                            "userEmail"
                                        ) || ""
                                    }
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                {/* ==============================
                    PAGE CONTENT
                =============================== */}

                <main className="user-content">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default UserLayout;