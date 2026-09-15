
import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";


function AdminHeader({ onMenuClick }) {

  // =========================================
  // STATE
  // =========================================

  const [showProfile, setShowProfile] =
    useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [messages, setMessages] =
    useState([]);


  // =========================================
  // ROUTER
  // =========================================

  const location = useLocation();

  const navigate = useNavigate();


  // =========================================
  // REF
  // =========================================

  const notificationRef =
    useRef(null);


  // =========================================
  // SEARCH
  // =========================================

  const searchParams =
    new URLSearchParams(
      location.search
    );

  const searchValue =
    searchParams.get("search") || "";


  // =========================================
  // FETCH NOTIFICATIONS
  // =========================================

  const fetchNotifications = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/Backend/api/notifications"
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch notifications"
        );

      }

      const data =
        await response.json();

      setNotifications(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Error fetching notifications:",
        error
      );

    }

  };


  // =========================================
  // FETCH CONTACT MESSAGES
  // =========================================

  const fetchMessages = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/Backend/api/messages"
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch messages"
        );

      }

      const data =
        await response.json();

      setMessages(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Error fetching messages:",
        error
      );

    }

  };


  // =========================================
  // LOAD NOTIFICATIONS + MESSAGES
  // =========================================

  useEffect(() => {

    fetchNotifications();
    fetchMessages();

    const interval =
      setInterval(() => {

        fetchNotifications();
        fetchMessages();

      }, 10000);

    return () => {

      clearInterval(interval);

    };

  }, []);


  // =========================================
  // SEARCH HANDLER
  // =========================================

  const handleSearch = (e) => {

    const value =
      e.target.value;

    const params =
      new URLSearchParams(
        location.search
      );

    if (value.trim() === "") {

      params.delete("search");

    } else {

      params.set(
        "search",
        value
      );

    }

    const queryString =
      params.toString();

    navigate(
      queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname,
      {
        replace: true,
      }
    );

  };


  // =========================================
  // UNREAD NOTIFICATION COUNT
  // =========================================

  const unreadNotificationCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;


  // =========================================
  // UNREAD MESSAGE COUNT
  // =========================================

  const unreadMessageCount =
    messages.filter(
      (message) =>
        message.status === "Unread"
    ).length;


  // =========================================
  // TOTAL UNREAD COUNT
  // =========================================

  const unreadCount =
    unreadNotificationCount +
    unreadMessageCount;


  // =========================================
  // FORMAT TIME
  // =========================================

  const formatNotificationTime = (
    createdAt
  ) => {

    if (!createdAt) {

      return "";

    }

    const notificationDate =
      new Date(createdAt);

    if (
      Number.isNaN(
        notificationDate.getTime()
      )
    ) {

      return createdAt;

    }

    const now =
      new Date();

    const difference =
      Math.floor(
        (
          now.getTime() -
          notificationDate.getTime()
        ) / 1000
      );


    if (difference < 60) {

      return "Just now";

    }


    const minutes =
      Math.floor(
        difference / 60
      );

    if (minutes < 60) {

      return `${minutes} minute${
        minutes === 1 ? "" : "s"
      } ago`;

    }


    const hours =
      Math.floor(
        minutes / 60
      );

    if (hours < 24) {

      return `${hours} hour${
        hours === 1 ? "" : "s"
      } ago`;

    }


    const days =
      Math.floor(
        hours / 24
      );

    if (days < 7) {

      return `${days} day${
        days === 1 ? "" : "s"
      } ago`;

    }


    return notificationDate.toLocaleDateString();

  };


  // =========================================
  // CLICK NOTIFICATION
  // =========================================

  const handleNotificationClick =
    async (notification) => {

      try {

        // =====================================
        // MARK NOTIFICATION AS READ
        // =====================================

        if (!notification.read) {

          const response =
            await fetch(
              `http://localhost:8080/Backend/api/notifications?id=${notification.id}`,
              {
                method: "PUT",
              }
            );

          if (!response.ok) {

            throw new Error(
              "Failed to mark notification as read"
            );

          }

        }


        // =====================================
        // UPDATE LOCAL STATE
        // =====================================

        setNotifications(
          (currentNotifications) =>
            currentNotifications.map(
              (currentNotification) =>
                currentNotification.id ===
                notification.id
                  ? {
                      ...currentNotification,
                      read: true,
                    }
                  : currentNotification
            )
        );


        // =====================================
        // CLOSE DROPDOWN
        // =====================================

        setShowNotifications(false);


        // =====================================
        // NEW LEAD → LEADS PAGE
        // =====================================

        if (
          notification.title &&
          notification.title
            .toLowerCase()
            .includes("lead")
        ) {

          navigate("/admin/leads");

          return;

        }


        // =====================================
        // OTHER NOTIFICATIONS
        // =====================================

        if (notification.link) {

          navigate(
            notification.link
          );

        } else {

          navigate(
            "/admin"
          );

        }

      } catch (error) {

        console.error(
          "Error opening notification:",
          error
        );

      }

    };


  // =========================================
  // CLICK MESSAGE
  // =========================================

  const handleMessageClick =
    async (message) => {

      try {

        // =====================================
        // MARK MESSAGE AS READ
        // =====================================

        if (
          message.status === "Unread"
        ) {

          const response =
            await fetch(
              `http://localhost:8080/Backend/api/messages/${message.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  status: "Read",
                }),
              }
            );

          if (!response.ok) {

            throw new Error(
              "Failed to mark message as read"
            );

          }

        }


        // =====================================
        // UPDATE LOCAL STATE
        // =====================================

        setMessages(
          (currentMessages) =>
            currentMessages.map(
              (currentMessage) =>
                currentMessage.id ===
                message.id
                  ? {
                      ...currentMessage,
                      status: "Read",
                    }
                  : currentMessage
            )
        );


        // =====================================
        // CLOSE DROPDOWN
        // =====================================

        setShowNotifications(false);


        // =====================================
        // GO TO MESSAGES
        // =====================================

        navigate(
          `/admin/messages?search=${encodeURIComponent(
            message.email
          )}`
        );

      } catch (error) {

        console.error(
          "Error opening message:",
          error
        );

        setShowNotifications(false);

        navigate(
          `/admin/messages?search=${encodeURIComponent(
            message.email
          )}`
        );

      }

    };


  // =========================================
  // MARK ALL AS READ
  // =========================================

  const handleMarkAllAsRead =
    async () => {

      try {

        // =====================================
        // MARK ALL NOTIFICATIONS AS READ
        // =====================================

        if (
          unreadNotificationCount > 0
        ) {

          const response =
            await fetch(
              "http://localhost:8080/Backend/api/notifications?action=readAll",
              {
                method: "PUT",
              }
            );

          if (!response.ok) {

            throw new Error(
              "Failed to mark notifications as read"
            );

          }

        }


        // =====================================
        // GET UNREAD MESSAGES
        // =====================================

        const unreadMessages =
          messages.filter(
            (message) =>
              message.status === "Unread"
          );


        // =====================================
        // MARK ALL MESSAGES AS READ
        // =====================================

        if (
          unreadMessages.length > 0
        ) {

          await Promise.all(
            unreadMessages.map(
              async (message) => {

                const response =
                  await fetch(
                    `http://localhost:8080/Backend/api/messages/${message.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify({
                        status: "Read",
                      }),
                    }
                  );

                if (!response.ok) {

                  throw new Error(
                    `Failed to mark message ${message.id} as read`
                  );

                }

              }
            )
          );

        }


        // =====================================
        // UPDATE NOTIFICATIONS STATE
        // =====================================

        setNotifications(
          (currentNotifications) =>
            currentNotifications.map(
              (notification) => ({
                ...notification,
                read: true,
              })
            )
        );


        // =====================================
        // UPDATE MESSAGES STATE
        // =====================================

        setMessages(
          (currentMessages) =>
            currentMessages.map(
              (message) => ({
                ...message,
                status: "Read",
              })
            )
        );

      } catch (error) {

        console.error(
          "Error marking all as read:",
          error
        );

      }

    };


  // =========================================
  // TOGGLE NOTIFICATIONS
  // =========================================

  const toggleNotifications = () => {

    setShowNotifications(
      (previous) => !previous
    );

    setShowProfile(false);

  };


  // =========================================
  // CLICK OUTSIDE
  // =========================================

  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {

        setShowNotifications(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================================
  // CLOSE DROPDOWN ON ROUTE CHANGE
  // =========================================

  useEffect(() => {

    setShowNotifications(false);

  }, [location.pathname]);


  // =========================================
  // UNREAD MESSAGES
  // =========================================

  const unreadMessages =
    messages.filter(
      (message) =>
        message.status === "Unread"
    );


  // =========================================
  // RETURN
  // =========================================

  return (

    <header className="admin-header-bar">


      {/* =====================================
          MOBILE MENU
          ===================================== */}

      <button
        className="admin-mobile-menu"
        type="button"
        onClick={onMenuClick}
        aria-label="Open admin menu"
      >
        ☰
      </button>


      {/* =====================================
          SEARCH
          ===================================== */}

      <div className="admin-search">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
        />

      </div>


      {/* =====================================
          HEADER RIGHT
          ===================================== */}

      <div className="admin-header-right">


        {/* ===================================
            NOTIFICATION
            =================================== */}

        <div
          className="admin-notification-wrapper"
          ref={notificationRef}
        >

          <button
            className="admin-notification"
            type="button"
            onClick={toggleNotifications}
            aria-label="Notifications"
          >

            🔔


            {/* UNREAD COUNT */}

            {unreadCount > 0 && (

              <span className="notification-dot">

                {unreadCount}

              </span>

            )}

          </button>


          {/* =================================
              DROPDOWN
              ================================= */}

          {showNotifications && (

            <div className="admin-notification-dropdown">


              {/* =================================
                  HEADER
                  ================================= */}

              <div className="admin-notification-header">

                <div>

                  <h3>
                    Notifications
                  </h3>

                  <span>
                    {unreadCount} unread
                  </span>

                </div>


                {unreadCount > 0 && (

                  <button
                    type="button"
                    className="mark-all-read"
                    onClick={
                      handleMarkAllAsRead
                    }
                  >
                    Mark all as read
                  </button>

                )}

              </div>


              {/* =================================
                  NOTIFICATION LIST
                  ================================= */}

              <div className="admin-notification-list">


                {/* =================================
                    SYSTEM NOTIFICATIONS
                    ================================= */}

                {notifications.length > 0 && (

                  <>

                    {notifications.map(
                      (notification) => (

                        <button
                          key={
                            `notification-${notification.id}`
                          }
                          type="button"
                          className={
                            `admin-notification-item ${
                              !notification.read
                                ? "unread"
                                : ""
                            }`
                          }
                          onClick={() =>
                            handleNotificationClick(
                              notification
                            )
                          }
                        >

                          <span
                            className={
                              `notification-item-dot ${
                                notification.read
                                  ? "read"
                                  : ""
                              }`
                            }
                          />


                          <div className="notification-item-content">

                            <strong>
                              {
                                notification.title
                              }
                            </strong>

                            <p>
                              {
                                notification.message
                              }
                            </p>

                            <span>
                              {
                                formatNotificationTime(
                                  notification.createdAt
                                )
                              }
                            </span>

                          </div>


                          {!notification.read && (

                            <span className="notification-unread-dot" />

                          )}

                        </button>

                      )
                    )}

                  </>

                )}


                {/* =================================
                    CONTACT MESSAGES
                    ================================= */}

                {unreadMessages.length > 0 && (

                  <>

                    <div className="admin-notification-section-title">

                      Messages

                    </div>


                    {unreadMessages.map(
                      (message) => (

                        <button
                          key={
                            `message-${message.id}`
                          }
                          type="button"
                          className="admin-notification-item unread"
                          onClick={() =>
                            handleMessageClick(
                              message
                            )
                          }
                        >

                          <span className="notification-item-dot" />


                          <div className="notification-item-content">

                            <strong>
                              {message.name}
                            </strong>

                            <p>
                              {
                                message.subject ||
                                "New contact message"
                              }
                            </p>

                            <span>
                              {message.email}
                            </span>

                          </div>


                          <span className="notification-unread-dot" />

                        </button>

                      )
                    )}

                  </>

                )}


                {/* =================================
                    EMPTY STATE
                    ================================= */}

                {notifications.length === 0 &&
                 unreadMessages.length === 0 && (

                  <div className="no-notifications">

                    <span>
                      🔔
                    </span>

                    <p>
                      No notifications
                    </p>

                  </div>

                )}

              </div>


              {/* =================================
                  FOOTER
                  ================================= */}

              <div className="admin-notification-footer">

                <Link
                  to="/admin"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  View dashboard
                </Link>

              </div>

            </div>

          )}

        </div>


        {/* =====================================
            PROFILE
            ===================================== */}

        <div className="admin-profile-wrapper">

          <button
            className="admin-profile"
            type="button"
            onClick={() => {

              setShowProfile(
                (previous) => !previous
              );

              setShowNotifications(false);

            }}
          >

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-profile-info">

              <strong>
                Admin
              </strong>

              <span>
                Administrator
              </span>

            </div>

            <span className="profile-arrow">
              ▼
            </span>

          </button>


          {/* PROFILE DROPDOWN */}

          {showProfile && (

            <div className="admin-profile-dropdown">

              <Link to="/admin/settings">
                ⚙ Settings
              </Link>

              <Link to="/">
                ↗ View Website
              </Link>

              <Link to="/admin/login">
                ↪ Logout
              </Link>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}


export default AdminHeader;
