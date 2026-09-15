import {
    useEffect,
    useState
} from "react";

import "../styles/user-notifications.css";

import {
    getUserNotifications,
    markUserNotificationAsRead
} from "../services/api";


function Notifications() {

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FETCH NOTIFICATIONS
    // ==========================================

    const fetchNotifications = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getUserNotifications();

            setNotifications(data);

        } catch (error) {

            console.error(
                "Failed to fetch notifications:",
                error
            );

            setError(
                "Unable to load notifications"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // LOAD NOTIFICATIONS
    // ==========================================

    useEffect(() => {

        fetchNotifications();

    }, []);


    // ==========================================
    // MARK NOTIFICATION AS READ
    // ==========================================

    const handleMarkAsRead = async (id) => {

        try {

            await markUserNotificationAsRead(id);


            // Update this page immediately

            setNotifications(
                (previousNotifications) =>
                    previousNotifications.map(
                        (notification) =>
                            notification.id === id
                                ? {
                                      ...notification,
                                      isRead: true
                                  }
                                : notification
                    )
            );


            // Tell UserLayout to update
            // notification badge

            window.dispatchEvent(
                new Event("notificationRead")
            );


        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }
    };


    // ==========================================
    // NOTIFICATION TYPE
    // ==========================================

    const getTypeClass = (type) => {

        if (!type) return "";

        const value =
            type.toLowerCase();

        if (value === "project")
            return "project";

        if (value === "task")
            return "task";

        if (value === "payment")
            return "payment";

        if (value === "message")
            return "message";

        if (value === "system")
            return "system";

        return "";
    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date)
            return "Date unavailable";

        return date.replace(".0", "");
    };


    // ==========================================
    // UNREAD COUNT
    // ==========================================

    const unreadCount =
        notifications.filter(
            (notification) =>
                !notification.isRead
        ).length;


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="user-notifications-page">

                <div className="user-notifications-loading">

                    <div className="user-notifications-spinner"></div>

                    <p>
                        Loading your notifications...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="user-notifications-page">

                <div className="user-notifications-error">

                    <h3>
                        Unable to load notifications
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={
                            fetchNotifications
                        }
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    // ==========================================
    // MAIN PAGE
    // ==========================================

    return (

        <div className="user-notifications-page">


            {/* ==============================
                PAGE HEADER
            =============================== */}

            <div className="user-notifications-header">

                <div>

                    <span className="user-notifications-label">
                        NOTIFICATIONS
                    </span>

                    <h2>
                        Your Notifications
                    </h2>

                    <p>
                        Stay updated with your DevLab
                        projects, tasks, payments,
                        and messages.
                    </p>

                </div>


                <div className="user-notifications-count">

                    {unreadCount} unread

                </div>

            </div>


            {/* ==============================
                SUMMARY
            =============================== */}

            <div className="user-notifications-summary">


                {/* TOTAL */}

                <div className="user-notification-summary-card">

                    <div className="user-notification-summary-icon">
                        ●
                    </div>

                    <div>

                        <span>
                            Total Notifications
                        </span>

                        <strong>
                            {notifications.length}
                        </strong>

                    </div>

                </div>


                {/* UNREAD */}

                <div className="user-notification-summary-card">

                    <div className="user-notification-summary-icon">
                        ●
                    </div>

                    <div>

                        <span>
                            Unread
                        </span>

                        <strong>
                            {unreadCount}
                        </strong>

                    </div>

                </div>


                {/* READ */}

                <div className="user-notification-summary-card">

                    <div className="user-notification-summary-icon">
                        ✓
                    </div>

                    <div>

                        <span>
                            Read
                        </span>

                        <strong>
                            {
                                notifications.length -
                                unreadCount
                            }
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==============================
                NOTIFICATIONS SECTION
            =============================== */}

            <div className="user-notifications-section">


                <div className="user-notifications-section-header">

                    <div>

                        <h3>
                            All Notifications
                        </h3>

                        <p>
                            Your latest DevLab updates.
                        </p>

                    </div>

                </div>


                {/* ==============================
                    EMPTY
                =============================== */}

                {notifications.length === 0 ? (

                    <div className="user-notifications-empty">

                        <div className="user-notifications-empty-icon">
                            ✓
                        </div>

                        <h3>
                            No Notifications
                        </h3>

                        <p>
                            You don't have any
                            notifications yet.
                        </p>

                    </div>

                ) : (


                    /* ==============================
                        NOTIFICATION LIST
                    =============================== */

                    <div className="user-notifications-list">

                        {notifications.map(
                            (notification) => (

                                <div
                                    className={`user-notification-card ${
                                        notification.isRead
                                            ? "read"
                                            : "unread"
                                    }`}
                                    key={
                                        notification.id
                                    }
                                >


                                    {/* ICON */}

                                    <div className="user-notification-icon">

                                        {
                                            notification.isRead
                                                ? "✓"
                                                : "●"
                                        }

                                    </div>


                                    {/* MAIN CONTENT */}

                                    <div className="user-notification-main">


                                        <div className="user-notification-title-row">

                                            <h3>
                                                {
                                                    notification.title
                                                }
                                            </h3>

                                            <span
                                                className={`user-notification-type ${getTypeClass(
                                                    notification.type
                                                )}`}
                                            >
                                                {
                                                    notification.type ||
                                                    "General"
                                                }
                                            </span>

                                        </div>


                                        <p className="user-notification-message">

                                            {
                                                notification.message
                                            }

                                        </p>


                                        <div className="user-notification-meta">

                                            <span>
                                                {
                                                    formatDate(
                                                        notification.createdAt
                                                    )
                                                }
                                            </span>


                                            {notification.referenceId >
                                                0 && (

                                                <span>
                                                    Reference #
                                                    {
                                                        notification.referenceId
                                                    }
                                                </span>

                                            )}

                                        </div>


                                        {/* ==============================
                                            MARK AS READ BUTTON
                                        =============================== */}

                                        {!notification.isRead && (

                                            <button
                                                className="mark-notification-read-button"
                                                onClick={() =>
                                                    handleMarkAsRead(
                                                        notification.id
                                                    )
                                                }
                                            >
                                                Mark as Read
                                            </button>

                                        )}

                                    </div>


                                    {/* UNREAD DOT */}

                                    {!notification.isRead && (

                                        <span className="user-notification-unread-dot">
                                            ●
                                        </span>

                                    )}

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Notifications;