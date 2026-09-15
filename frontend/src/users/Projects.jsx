import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/user-projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://devlab-backend-4d8f.onrender.com/api/user/projects",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Unable to load projects");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "";

    const value = status.toLowerCase();

    if (value === "completed") {
      return "completed";
    }

    if (value === "development") {
      return "development";
    }

    if (value === "design") {
      return "design";
    }

    if (value === "planning") {
      return "planning";
    }

    return "";
  };

  if (loading) {
    return (
      <div className="user-projects-page">
        <div className="user-projects-loading">
          <div className="user-projects-spinner"></div>
          <p>Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-projects-page">
        <div className="user-projects-error">
          <h3>Unable to load projects</h3>
          <p>{error}</p>

          <button onClick={fetchProjects}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) =>
      project.status &&
      project.status.toLowerCase() === "completed"
  ).length;

  const activeProjects = projects.filter(
    (project) =>
      project.status &&
      project.status.toLowerCase() !== "completed"
  ).length;

  return (
    <div className="user-projects-page">

      {/* Page Header */}
      <div className="user-projects-header">
        <div>
          <span className="user-projects-label">
            PROJECTS
          </span>

          <h2>Your Projects</h2>

          <p>
            Track the progress and status of your DevLab projects.
          </p>
        </div>

        <NavLink
          to="/contact"
          className="user-projects-contact-button"
        >
          Start a Project
        </NavLink>
      </div>

      {/* Summary Cards */}
      <div className="user-projects-summary">

        <div className="user-project-summary-card">
          <div className="user-project-summary-icon">
            ▣
          </div>

          <div>
            <span>Total Projects</span>
            <strong>{totalProjects}</strong>
          </div>
        </div>

        <div className="user-project-summary-card">
          <div className="user-project-summary-icon">
            ◐
          </div>

          <div>
            <span>Active Projects</span>
            <strong>{activeProjects}</strong>
          </div>
        </div>

        <div className="user-project-summary-card">
          <div className="user-project-summary-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedProjects}</strong>
          </div>
        </div>

      </div>

      {/* Projects Table */}
      <div className="user-projects-section">

        <div className="user-projects-section-header">
          <div>
            <h3>All Projects</h3>
            <p>
              Your latest projects and their current progress.
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="user-projects-empty">
            <div className="user-projects-empty-icon">
              ▣
            </div>

            <h3>No Projects Yet</h3>

            <p>
              Your DevLab projects will appear here once
              they are created.
            </p>
          </div>
        ) : (
          <div className="user-projects-table-wrapper">

            <table className="user-projects-table">

              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Amount</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>

                {projects.map((project) => (
                  <tr key={project.id}>

                    <td>
                      <div className="user-project-name">
                        <div className="user-project-icon">
                          ▣
                        </div>

                        <div>
                          <strong>
                            {project.name}
                          </strong>

                          <span>
                            Project #{project.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      {project.client}
                    </td>

                    <td>
                      <span
                        className={`user-project-status ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td>
                      <div className="user-project-progress">

                        <div className="user-project-progress-info">
                          <span>
                            {project.progress}%
                          </span>
                        </div>

                        <div className="user-project-progress-bar">
                          <div
                            className="user-project-progress-fill"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          ></div>
                        </div>

                      </div>
                    </td>

                    <td>
                      <strong>
                        ₹{project.amount}
                      </strong>
                    </td>

                    <td>
                      {project.createdAt
                        ? project.createdAt.split(" ")[0]
                        : "-"}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Projects;