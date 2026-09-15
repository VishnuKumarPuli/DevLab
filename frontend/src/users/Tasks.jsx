import { useEffect, useState } from "react";
import "../styles/user-tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://devlab-backend-4d8f.onrender.com/api/user/tasks",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load tasks");
      }

      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setError("Unable to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "";

    const value = status.toLowerCase();

    if (value === "completed") return "completed";
    if (value === "in progress") return "in-progress";
    if (value === "pending") return "pending";

    return "";
  };

  const getPriorityClass = (priority) => {
    if (!priority) return "";

    const value = priority.toLowerCase();

    if (value === "high") return "high";
    if (value === "medium") return "medium";
    if (value === "low") return "low";

    return "";
  };

  if (loading) {
    return (
      <div className="user-tasks-page">
        <div className="user-tasks-loading">
          <div className="user-tasks-spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-tasks-page">
        <div className="user-tasks-error">
          <h3>Unable to load tasks</h3>
          <p>{error}</p>

          <button onClick={fetchTasks}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-tasks-page">

      <div className="user-tasks-header">
        <div>
          <span className="user-tasks-label">
            TASKS
          </span>

          <h2>Your Tasks</h2>

          <p>
            Track the tasks and work assigned to your projects.
          </p>
        </div>
      </div>

      <div className="user-tasks-summary">

        <div className="user-task-summary-card">
          <div className="user-task-summary-icon">
            ✓
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
        </div>

        <div className="user-task-summary-card">
          <div className="user-task-summary-icon">
            ◐
          </div>

          <div>
            <span>In Progress</span>
            <strong>
              {
                tasks.filter(
                  (task) =>
                    task.status &&
                    task.status.toLowerCase() === "in progress"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="user-task-summary-card">
          <div className="user-task-summary-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {
                tasks.filter(
                  (task) =>
                    task.status &&
                    task.status.toLowerCase() === "completed"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      <div className="user-tasks-section">

        <div className="user-tasks-section-header">
          <div>
            <h3>All Tasks</h3>
            <p>
              Tasks related to your DevLab projects.
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="user-tasks-empty">
            <div className="user-tasks-empty-icon">
              ✓
            </div>

            <h3>No Tasks Yet</h3>

            <p>
              Tasks assigned to your projects will appear here.
            </p>
          </div>
        ) : (
          <div className="user-tasks-list">

            {tasks.map((task) => (
              <div
                className="user-task-card"
                key={task.id}
              >

                <div className="user-task-main">

                  <div className="user-task-icon">
                    ✓
                  </div>

                  <div className="user-task-info">

                    <h3>{task.title}</h3>

                    <p>
                      {task.description ||
                        "No description available."}
                    </p>

                    <div className="user-task-meta">

                      <span>
                        Project #{task.projectId}
                      </span>

                      <span>
                        Assigned to:{" "}
                        {task.assignedTo || "DevLab Team"}
                      </span>

                      <span>
                        Due: {task.dueDate || "Not set"}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="user-task-right">

                  <span
                    className={`user-task-status ${getStatusClass(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`user-task-priority ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Tasks;