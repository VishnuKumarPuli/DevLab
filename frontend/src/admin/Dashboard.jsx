
import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useSearchParams
} from "react-router-dom";

import {
  getAllLeads,
  getDashboard,
  getAllMessages
} from "../services/api";


function Dashboard() {

  // =========================================
  // STATE
  // =========================================

  const [leads, setLeads] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [dashboardData, setDashboardData] =
    useState({

      totalLeads: 0,

      newLeads: 0,

      contactedLeads: 0,

      convertedLeads: 0,

      activeProjects: 0,

      completedProjects: 0,

      totalRevenue: 0

    });

  const [selectedLead, setSelectedLead] =
    useState(null);


  // =========================================
  // SEARCH
  // =========================================

  const [searchParams] =
    useSearchParams();

  const searchQuery =
    searchParams.get("search") || "";


  // =========================================
  // LOAD DASHBOARD DATA
  // =========================================

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true);

        const [
          leadsData,
          dashboardDataResponse,
          messagesData
        ] = await Promise.all([

          getAllLeads(),

          getDashboard(),

          getAllMessages()

        ]);


        console.log(
          "Dashboard leads:",
          leadsData
        );

        console.log(
          "Dashboard data:",
          dashboardDataResponse
        );

        console.log(
          "Dashboard messages:",
          messagesData
        );


        setLeads(
          leadsData
        );

        setDashboardData(
          dashboardDataResponse
        );

        setMessages(
          messagesData
        );


      } catch (error) {

        console.error(
          "Error loading dashboard:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboard();

  }, []);


  // =========================================
  // SEARCH LEADS
  // =========================================

  const filteredLeads =
    leads.filter((lead) => {

      const search =
        searchQuery.toLowerCase();

      return (

        lead.name
          ?.toLowerCase()
          .includes(search)

        ||

        lead.email
          ?.toLowerCase()
          .includes(search)

        ||

        lead.phone
          ?.toLowerCase()
          .includes(search)

        ||

        lead.service
          ?.toLowerCase()
          .includes(search)

        ||

        lead.status
          ?.toLowerCase()
          .includes(search)

      );

    });


  // =========================================
  // UNREAD MESSAGES
  // =========================================

  const unreadMessages =
    messages.filter(
      (message) =>
        message.status === "Unread"
    ).length;


  // =========================================
  // DASHBOARD STATS
  // =========================================

  const stats = [

    {
      icon: "👥",
      title: "Total Leads",
      value:
        dashboardData.totalLeads,
      link: "/admin/leads"
    },

    {
      icon: "🆕",
      title: "New Leads",
      value:
        dashboardData.newLeads,
      link: "/admin/leads"
    },

    {
      icon: "📞",
      title: "Contacted Leads",
      value:
        dashboardData.contactedLeads,
      link: "/admin/leads"
    },

    {
      icon: "✅",
      title: "Converted Leads",
      value:
        dashboardData.convertedLeads,
      link: "/admin/leads"
    },

    {
      icon: "📁",
      title: "Active Projects",
      value:
        dashboardData.activeProjects,
      link: "/admin/projects"
    },

    {
      icon: "✔️",
      title: "Completed Projects",
      value:
        dashboardData.completedProjects,
      link: "/admin/projects"
    },

    {
      icon: "💰",
      title: "Total Revenue",
      value:
        `₹${Number(
          dashboardData.totalRevenue || 0
        ).toLocaleString("en-IN")}`,
      link: "/admin/payments"
    },

    {
      icon: "💬",
      title: "Unread Messages",
      value:
        unreadMessages,
      link: "/admin/messages"
    }

  ];


  // =========================================
  // RECENT LEADS
  // =========================================

  const recentLeads =
    [...filteredLeads]
      .reverse()
      .slice(0, 4);


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="admin-page">

        <div className="admin-container">

          <div className="admin-empty-state">

            <p>
              Loading dashboard...
            </p>

          </div>

        </div>

      </div>

    );

  }


  // =========================================
  // RETURN
  // =========================================

  return (

    <div className="admin-page">

      <div className="admin-container">


        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="admin-page-header">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back to your DevLab
              admin dashboard.
            </p>

          </div>

        </div>


        {/* =====================================
            SEARCH RESULT
        ====================================== */}

        {searchQuery && (

          <p className="admin-search-result-text">

            Search results for:

            {" "}

            <strong>
              {searchQuery}
            </strong>

          </p>

        )}


        {/* =====================================
            STAT CARDS
        ====================================== */}

        <div className="admin-stats-grid">

          {stats.map(
            (stat, index) => (

              <Link
                to={stat.link}
                className="admin-stat-card"
                key={index}
              >

                <div className="admin-stat-icon">

                  {stat.icon}

                </div>

                <div className="admin-stat-content">

                  <p>
                    {stat.title}
                  </p>

                  <h2>
                    {stat.value}
                  </h2>

                </div>

              </Link>

            )
          )}

        </div>


        {/* =====================================
            RECENT LEADS
        ====================================== */}

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                Recent Leads
              </h2>

              <p>
                Latest leads received from
                your website.
              </p>

            </div>


            <Link
              to="/admin/leads"
              className="admin-view-all"
            >
              View All
            </Link>

          </div>


          {recentLeads.length === 0 ? (

            <div className="admin-empty-state">

              <p>
                No leads found.
              </p>

            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>
                      Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Service
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {recentLeads.map(
                    (lead) => (

                      <tr
                        key={lead.id}
                      >

                        <td>
                          {lead.name}
                        </td>

                        <td>
                          {lead.email}
                        </td>

                        <td>
                          {lead.service || "-"}
                        </td>

                        <td>

                          <span
                            className={`admin-status ${lead.status
                              ?.toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )}`}
                          >

                            {lead.status}

                          </span>

                        </td>

                        <td>

                          <button
                            className="admin-small-button"
                            onClick={() =>
                              setSelectedLead(
                                lead
                              )
                            }
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* =====================================
            QUICK ACTIONS
        ====================================== */}

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Quickly manage your DevLab
                business.
              </p>

            </div>

          </div>


          <div className="admin-quick-actions">

            <Link
              to="/admin/leads"
              className="admin-quick-action"
            >

              <span>
                👥
              </span>

              <div>

                <strong>
                  Manage Leads
                </strong>

                <small>
                  View and manage leads
                </small>

              </div>

            </Link>


            <Link
              to="/admin/projects"
              className="admin-quick-action"
            >

              <span>
                📁
              </span>

              <div>

                <strong>
                  Manage Projects
                </strong>

                <small>
                  View active projects
                </small>

              </div>

            </Link>


            <Link
              to="/admin/messages"
              className="admin-quick-action"
            >

              <span>
                💬
              </span>

              <div>

                <strong>
                  Messages
                </strong>

                <small>
                  View customer messages
                </small>

              </div>

            </Link>


            <Link
              to="/admin/payments"
              className="admin-quick-action"
            >

              <span>
                💰
              </span>

              <div>

                <strong>
                  Payments
                </strong>

                <small>
                  Manage payments
                </small>

              </div>

            </Link>

          </div>

        </div>


      </div>


      {/* =====================================
          LEAD DETAILS MODAL
      ====================================== */}

      {selectedLead && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedLead(null)
          }
        >

          <div
            className="admin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>

                <h2>
                  Lead Details
                </h2>

                <p>
                  View complete lead
                  information.
                </p>

              </div>


              <button
                className="admin-modal-close"
                onClick={() =>
                  setSelectedLead(null)
                }
              >
                ×
              </button>

            </div>


            <div className="admin-modal-body">

              <div className="admin-detail-row">

                <strong>
                  Name
                </strong>

                <span>
                  {selectedLead.name}
                </span>

              </div>


              <div className="admin-detail-row">

                <strong>
                  Email
                </strong>

                <span>
                  {selectedLead.email}
                </span>

              </div>


              <div className="admin-detail-row">

                <strong>
                  Phone
                </strong>

                <span>
                  {selectedLead.phone || "-"}
                </span>

              </div>


              <div className="admin-detail-row">

                <strong>
                  Service
                </strong>

                <span>
                  {selectedLead.service || "-"}
                </span>

              </div>


              <div className="admin-detail-row">

                <strong>
                  Status
                </strong>

                <span>
                  {selectedLead.status || "-"}
                </span>

              </div>


              <div className="admin-detail-row">

                <strong>
                  Message
                </strong>

                <span>
                  {selectedLead.message || "-"}
                </span>

              </div>


              {selectedLead.createdAt && (

                <div className="admin-detail-row">

                  <strong>
                    Created
                  </strong>

                  <span>
                    {selectedLead.createdAt}
                  </span>

                </div>

              )}

            </div>


            <div className="admin-modal-footer">

              <button
                className="admin-primary-button"
                onClick={() =>
                  setSelectedLead(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default Dashboard;
