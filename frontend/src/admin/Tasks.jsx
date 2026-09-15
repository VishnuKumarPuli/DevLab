import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllTasks,
  getAllProjects,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";


function Tasks() {

  // =========================================================
  // STATE
  // =========================================================

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);


  // =========================================================
  // SEARCH
  // =========================================================

  // Search comes ONLY from AdminHeader
  // Example:
  // /admin/tasks?search=website

  const [searchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search") || "";


  const [formData, setFormData] = useState({
    projectId: "",
    title: "",
    description: "",
    assignedTo: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });


  // =========================================================
  // LOAD TASKS + PROJECTS
  // =========================================================

  const loadData = async () => {

    try {

      setLoading(true);

      setError("");

      const [taskData, projectData] =
        await Promise.all([
          getAllTasks(),
          getAllProjects(),
        ]);


      setTasks(
        Array.isArray(taskData)
          ? taskData
          : []
      );


      setProjects(
        Array.isArray(projectData)
          ? projectData
          : []
      );

    } catch (err) {

      console.error(
        "Error loading tasks:",
        err
      );

      setError(
        "Unable to load tasks from MySQL."
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    loadData();

  }, []);


  // =========================================================
  // FORM INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // =========================================================
  // OPEN ADD TASK FORM
  // =========================================================

  const handleAddTask = () => {

    setEditingTask(null);

    setFormData({
      projectId:
        projects.length > 0
          ? String(projects[0].id)
          : "",
      title: "",
      description: "",
      assignedTo: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
    });

    setMessage("");

    setError("");

    setShowForm(true);
  };


  // =========================================================
  // OPEN EDIT TASK FORM
  // =========================================================

  const handleEditTask = (task) => {

    setEditingTask(task);

    setFormData({
      projectId:
        String(task.projectId || ""),
      title:
        task.title || "",
      description:
        task.description || "",
      assignedTo:
        task.assignedTo || "",
      status:
        task.status || "Pending",
      priority:
        task.priority || "Medium",
      dueDate:
        task.dueDate || "",
    });

    setMessage("");

    setError("");

    setShowForm(true);
  };


  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCloseForm = () => {

    setShowForm(false);

    setEditingTask(null);
  };


  // =========================================================
  // ADD / UPDATE TASK
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    setError("");


    try {

      if (!formData.projectId) {

        setError(
          "Please select a project."
        );

        return;
      }


      if (!formData.title.trim()) {

        setError(
          "Please enter a task title."
        );

        return;
      }


      let result;


      if (editingTask) {

        // UPDATE

        result =
          await updateTask(
            editingTask.id,
            formData
          );

      } else {

        // CREATE

        result =
          await createTask(
            formData
          );
      }


      if (result && result.success === false) {

        setError(
          result.message ||
          "Operation failed."
        );

        return;
      }


      setMessage(
        editingTask
          ? "Task updated successfully."
          : "Task added successfully."
      );


      setShowForm(false);

      setEditingTask(null);


      await loadData();

    } catch (err) {

      console.error(
        "Error saving task:",
        err
      );

      setError(
        "Unable to save task."
      );
    }
  };


  // =========================================================
  // QUICK STATUS UPDATE
  // =========================================================

  const handleStatusChange = async (
    task,
    status
  ) => {

    try {

      setError("");

      setMessage("");


      const updatedTask = {

        projectId:
          task.projectId,

        title:
          task.title,

        description:
          task.description || "",

        assignedTo:
          task.assignedTo || "",

        status:
          status,

        priority:
          task.priority || "Medium",

        dueDate:
          task.dueDate || "",
      };


      const result =
        await updateTask(
          task.id,
          updatedTask
        );


      if (result && result.success === false) {

        setError(
          result.message ||
          "Unable to update status."
        );

        return;
      }


      // Update screen immediately

      setTasks(
        tasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                status: status,
              }
            : item
        )
      );


      setMessage(
        "Task status updated."
      );

    } catch (err) {

      console.error(
        "Error updating status:",
        err
      );

      setError(
        "Unable to update task status."
      );
    }
  };


  // =========================================================
  // DELETE TASK
  // =========================================================

  const handleDeleteTask = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");

      setMessage("");


      const result =
        await deleteTask(id);


      if (result && result.success === false) {

        setError(
          result.message ||
          "Unable to delete task."
        );

        return;
      }


      setTasks(
        tasks.filter(
          (task) => task.id !== id
        )
      );


      setMessage(
        "Task deleted successfully."
      );

    } catch (err) {

      console.error(
        "Error deleting task:",
        err
      );

      setError(
        "Unable to delete task."
      );
    }
  };


  // =========================================================
  // FILTER TASKS
  // =========================================================

  const filteredTasks = tasks.filter((task) => {

    const search =
      searchTerm.toLowerCase().trim();


    // No search → show all tasks

    if (!search) {

      return true;

    }


    const title =
      String(task.title || "")
        .toLowerCase();

    const description =
      String(task.description || "")
        .toLowerCase();

    const projectName =
      String(task.projectName || "")
        .toLowerCase();

    const assignedTo =
      String(task.assignedTo || "")
        .toLowerCase();

    const status =
      String(task.status || "")
        .toLowerCase();

    const priority =
      String(task.priority || "")
        .toLowerCase();

    const dueDate =
      String(task.dueDate || "")
        .toLowerCase();


    return (

      title.includes(search) ||

      description.includes(search) ||

      projectName.includes(search) ||

      assignedTo.includes(search) ||

      status.includes(search) ||

      priority.includes(search) ||

      dueDate.includes(search)

    );

  });


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="admin-page">

        <div className="admin-container">

          <div className="admin-page-header">

            <div>
              <h1>Tasks</h1>

              <p>
                Track project development tasks.
              </p>
            </div>

          </div>


          <div className="admin-panel">

            <p>
              Loading tasks...
            </p>

          </div>

        </div>

      </div>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="admin-page">

      <div className="admin-container">


        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="admin-page-header">

          <div>

            <h1>
              Tasks
            </h1>

            <p>
              Track project development tasks.
            </p>

          </div>


          <button
            type="button"
            className="admin-primary-button"
            onClick={handleAddTask}
          >
            + Add Task
          </button>

        </div>


        {/* =====================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {message && (

          <div
            style={{
              marginBottom: "15px",
              padding: "12px 15px",
              borderRadius: "8px",
              background: "#f0fdf4",
              color: "#166534",
              border: "1px solid #bbf7d0",
              fontSize: "14px",
            }}
          >
            {message}
          </div>

        )}


        {/* =====================================================
            ERROR MESSAGE
        ====================================================== */}

        {error && (

          <div
            style={{
              marginBottom: "15px",
              padding: "12px 15px",
              borderRadius: "8px",
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              fontSize: "14px",
            }}
          >
            {error}
          </div>

        )}


        {/* =====================================================
            TASK RESULT INFO
        ====================================================== */}

        {tasks.length > 0 && (

          <div
            style={{
              marginBottom: "15px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >

            Showing{" "}

            <strong>
              {filteredTasks.length}
            </strong>

            {" "}of{" "}

            <strong>
              {tasks.length}
            </strong>

            {" "}tasks

          </div>

        )}


        {/* =====================================================
            TASK TABLE
        ====================================================== */}

        <div className="admin-panel">

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Task
                  </th>

                  <th>
                    Project
                  </th>

                  <th>
                    Assigned To
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Due Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredTasks.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >

                      {searchTerm.trim()
                        ? "No matching tasks found."
                        : "No tasks found."}

                    </td>

                  </tr>

                ) : (

                  filteredTasks.map((task) => (

                    <tr key={task.id}>

                      {/* TASK */}

                      <td>

                        <strong>
                          {task.title}
                        </strong>

                        {task.description && (

                          <div
                            style={{
                              marginTop: "5px",
                              color: "#64748b",
                              fontSize: "12px",
                            }}
                          >
                            {task.description}
                          </div>

                        )}

                      </td>


                      {/* PROJECT */}

                      <td>

                        {task.projectName ||
                          "Unknown Project"}

                      </td>


                      {/* ASSIGNED */}

                      <td>

                        {task.assignedTo ||
                          "Not assigned"}

                      </td>


                      {/* PRIORITY */}

                      <td>

                        <span
                          className={`status status-${(
                            task.priority ||
                            "Medium"
                          ).toLowerCase()}`}
                        >

                          <span className="status-dot"></span>

                          {task.priority ||
                            "Medium"}

                        </span>

                      </td>


                      {/* DUE DATE */}

                      <td>

                        {task.dueDate
                          ? new Date(
                              task.dueDate +
                                "T00:00:00"
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "No date"}

                      </td>


                      {/* STATUS */}

                      <td>

                        <select
                          className="admin-select"
                          value={
                            task.status ||
                            "Pending"
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              task,
                              e.target.value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                        </select>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >

                          <button
                            type="button"
                            className="admin-view-button"
                            onClick={() =>
                              handleEditTask(task)
                            }
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            className="admin-delete-button"
                            onClick={() =>
                              handleDeleteTask(
                                task.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* =====================================================
            ADD / EDIT TASK MODAL
        ====================================================== */}

        {showForm && (

          <div
            className="lead-modal-overlay"
            onClick={(e) => {

              if (
                e.target === e.currentTarget
              ) {
                handleCloseForm();
              }

            }}
          >

            <div className="lead-modal">


              {/* MODAL HEADER */}

              <div className="lead-modal-header">

                <h2>

                  {editingTask
                    ? "Edit Task"
                    : "Add Task"}

                </h2>


                <button
                  type="button"
                  className="lead-modal-close"
                  onClick={handleCloseForm}
                >
                  ×
                </button>

              </div>


              {/* FORM */}

              <form
                onSubmit={handleSubmit}
              >


                {/* PROJECT */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Project
                  </label>

                  <select
                    name="projectId"
                    value={
                      formData.projectId
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Project
                    </option>


                    {projects.map(
                      (project) => (

                        <option
                          key={project.id}
                          value={project.id}
                        >
                          {project.name}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* TITLE */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Task Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={
                      formData.title
                    }
                    onChange={handleChange}
                    placeholder="Enter task title"
                    required
                  />

                </div>


                {/* DESCRIPTION */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows="4"
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      padding: "10px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius: "8px",
                      resize: "vertical",
                      fontFamily: "inherit",
                      fontSize: "14px",
                    }}
                  />

                </div>


                {/* ASSIGNED TO */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Assigned To
                  </label>

                  <input
                    type="text"
                    name="assignedTo"
                    value={
                      formData.assignedTo
                    }
                    onChange={handleChange}
                    placeholder="Enter developer name"
                  />

                </div>


                {/* STATUS */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={handleChange}
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>

                </div>


                {/* PRIORITY */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={
                      formData.priority
                    }
                    onChange={handleChange}
                  >

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                  </select>

                </div>


                {/* DUE DATE */}

                <div
                  style={{
                    marginBottom: "16px",
                  }}
                >

                  <label>
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={
                      formData.dueDate
                    }
                    onChange={handleChange}
                  />

                </div>


                {/* FOOTER */}

                <div className="lead-modal-footer">

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-close-button"
                  >

                    {editingTask
                      ? "Update Task"
                      : "Add Task"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


export default Tasks;