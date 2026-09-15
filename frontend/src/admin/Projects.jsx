
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
} from "../services/api";


function Projects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================================================
    // SEARCH & FILTER
    // =========================================================

    // Search comes ONLY from AdminHeader
    // Example:
    // /admin/projects?search=website
    const [searchParams] = useSearchParams();

    const searchTerm =
        searchParams.get("search") || "";

    const [statusFilter, setStatusFilter] = useState("All");


    // =========================================================
    // FORM
    // =========================================================

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);


    const [formData, setFormData] = useState({
        name: "",
        client: "",
        status: "Planning",
        progress: 0,
        amount: ""
    });


    // =========================================================
    // MESSAGES
    // =========================================================

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================================================
    // LOAD PROJECTS
    // =========================================================

    const loadProjects = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllProjects();

            setProjects(data);

        } catch (error) {

            console.error(
                "Error loading projects:",
                error
            );

            setError(
                "Unable to load projects."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // LOAD PROJECTS WHEN PAGE OPENS
    // =========================================================

    useEffect(() => {

        loadProjects();

    }, []);


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================================================
    // OPEN ADD FORM
    // =========================================================

    const handleAddProject = () => {

        setEditingProject(null);

        setFormData({
            name: "",
            client: "",
            status: "Planning",
            progress: 0,
            amount: ""
        });

        setMessage("");
        setError("");

        setShowForm(true);
    };


    // =========================================================
    // OPEN EDIT FORM
    // =========================================================

    const handleEditProject = (project) => {

        setEditingProject(project);

        setFormData({
            name: project.name || "",
            client: project.client || "",
            status: project.status || "Planning",
            progress: project.progress || 0,
            amount: project.amount || ""
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

        setEditingProject(null);

        setFormData({
            name: "",
            client: "",
            status: "Planning",
            progress: 0,
            amount: ""
        });

        setMessage("");
        setError("");
    };


    // =========================================================
    // SUBMIT FORM
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        // Basic validation

        if (
            !formData.name.trim() ||
            !formData.client.trim()
        ) {

            setError(
                "Project name and client are required."
            );

            return;
        }


        try {

            let response;


            // =================================================
            // UPDATE
            // =================================================

            if (editingProject) {

                response = await updateProject(
                    editingProject.id,
                    formData
                );

            }


            // =================================================
            // CREATE
            // =================================================

            else {

                response = await createProject(
                    formData
                );
            }


            // =================================================
            // SUCCESS
            // =================================================

            if (response.success) {

                setMessage(
                    response.message
                );

                await loadProjects();


                setTimeout(() => {

                    handleCloseForm();

                }, 800);

            }


            // =================================================
            // ERROR
            // =================================================

            else {

                setError(
                    response.message ||
                    "Something went wrong."
                );
            }

        } catch (error) {

            console.error(
                "Error saving project:",
                error
            );

            setError(
                "Unable to save project."
            );
        }
    };


    // =========================================================
    // DELETE PROJECT
    // =========================================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this project?"
            );


        if (!confirmDelete) {

            return;
        }


        try {

            const response =
                await deleteProject(id);


            if (response.success) {

                setMessage(
                    response.message
                );


                setProjects(
                    projects.filter(
                        (project) =>
                            project.id !== id
                    )
                );

            } else {

                setError(
                    response.message ||
                    "Unable to delete project."
                );
            }

        } catch (error) {

            console.error(
                "Error deleting project:",
                error
            );

            setError(
                "Unable to delete project."
            );
        }
    };


    // =========================================================
    // FILTER PROJECTS
    // =========================================================

    const filteredProjects = projects.filter(
        (project) => {

            const projectName =
                project.name || "";

            const projectClient =
                project.client || "";

            const projectStatus =
                project.status || "";


            // Search comes from AdminHeader
            const search =
                searchTerm.toLowerCase().trim();


            const matchesSearch =
                projectName
                    .toLowerCase()
                    .includes(search) ||

                projectClient
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                statusFilter === "All" ||

                projectStatus
                    .toLowerCase() ===
                statusFilter.toLowerCase();


            return (
                matchesSearch &&
                matchesStatus
            );
        }
    );


    // =========================================================
    // CLEAR STATUS FILTER
    // =========================================================

    const handleClearFilters = () => {

        setStatusFilter("All");
    };


    // =========================================================
    // CHECK FILTER ACTIVE
    // =========================================================

    const filtersActive =
        searchTerm.trim() !== "" ||
        statusFilter !== "All";


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="admin-page">

            <div className="admin-container">


                {/* =====================================================
                    PAGE HEADER
                ===================================================== */}

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Projects
                        </h1>

                        <p>
                            Manage all client projects.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="admin-primary-button"
                        onClick={handleAddProject}
                    >
                        + Add Project
                    </button>

                </div>


                {/* =====================================================
                    SUCCESS MESSAGE
                ===================================================== */}

                {message && (

                    <div
                        style={{
                            marginBottom: "20px",
                            padding: "12px 16px",
                            borderRadius: "6px",
                            background: "#ecfdf5",
                            color: "#047857",
                            border: "1px solid #a7f3d0"
                        }}
                    >
                        {message}
                    </div>

                )}


                {/* =====================================================
                    ERROR MESSAGE
                ===================================================== */}

                {error && (

                    <div
                        style={{
                            marginBottom: "20px",
                            padding: "12px 16px",
                            borderRadius: "6px",
                            background: "#fef2f2",
                            color: "#b91c1c",
                            border: "1px solid #fecaca"
                        }}
                    >
                        {error}
                    </div>

                )}


                {/* =====================================================
                    STATUS FILTER ONLY

                    IMPORTANT:
                    There is NO search input here.

                    Search is handled by AdminHeader.
                ===================================================== */}

                {!loading &&
                    projects.length > 0 && (

                    <div className="project-filters">

                        {/* STATUS FILTER */}

                        <div className="project-status-filter">

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="All">
                                    All Status
                                </option>

                                <option value="Planning">
                                    Planning
                                </option>

                                <option value="Design">
                                    Design
                                </option>

                                <option value="Development">
                                    Development
                                </option>

                                <option value="Testing">
                                    Testing
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>


                        {/* CLEAR STATUS FILTER */}

                        {statusFilter !== "All" && (

                            <button
                                type="button"
                                className="project-clear-button"
                                onClick={handleClearFilters}
                            >
                                Clear
                            </button>

                        )}

                    </div>

                )}


                {/* =====================================================
                    RESULT COUNT
                ===================================================== */}

                {!loading &&
                    projects.length > 0 && (

                    <div className="project-result-info">

                        Showing{" "}

                        <strong>
                            {filteredProjects.length}
                        </strong>

                        {" "}of{" "}

                        <strong>
                            {projects.length}
                        </strong>

                        {" "}projects

                    </div>

                )}


                {/* =====================================================
                    LOADING
                ===================================================== */}

                {loading ? (

                    <div className="admin-panel">

                        <p>
                            Loading projects...
                        </p>

                    </div>

                ) : projects.length === 0 ? (

                    <div className="admin-panel">

                        <p>
                            No projects found.
                        </p>

                    </div>

                ) : filteredProjects.length === 0 ? (

                    /* =================================================
                       NO FILTER RESULTS
                    ================================================= */

                    <div className="project-no-results">

                        <div className="project-no-results-icon">
                            🔍
                        </div>

                        <h3>
                            No projects found
                        </h3>

                        <p>
                            No projects match your
                            current search or status filter.
                        </p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={handleClearFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                ) : (

                    /* =================================================
                       PROJECT GRID
                    ================================================= */

                    <div className="admin-project-grid">

                        {filteredProjects.map(
                            (project) => (

                            <div
                                className="admin-project-card"
                                key={project.id}
                            >


                                {/* =================================================
                                    PROJECT TOP
                                ================================================= */}

                                <div className="project-card-top">

                                    <div>

                                        <h3>
                                            {project.name}
                                        </h3>

                                        <p>
                                            Client:{" "}
                                            {project.client}
                                        </p>

                                    </div>


                                    {/* STATUS */}

                                    <span
                                        className={`status status-${(
                                            project.status || "planning"
                                        ).toLowerCase()}`}
                                    >

                                        <span className="status-dot"></span>

                                        {project.status}

                                    </span>

                                </div>


                                {/* =================================================
                                    PROJECT PROGRESS
                                ================================================= */}

                                <div className="project-progress">

                                    <div className="progress-header">

                                        <span>
                                            Progress
                                        </span>

                                        <strong>
                                            {project.progress}%
                                        </strong>

                                    </div>


                                    <div className="progress-bar">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${project.progress}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>


                                {/* =================================================
                                    PROJECT BOTTOM
                                ================================================= */}

                                <div className="project-card-bottom">

                                    <strong>
                                        {project.amount ||
                                            "Not provided"}
                                    </strong>


                                    <Link to="/admin/tasks">

                                        View Tasks →

                                    </Link>

                                </div>


                                {/* =================================================
                                    PROJECT ACTIONS
                                ================================================= */}

                                <div
                                    className="project-card-actions"
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEditProject(
                                                project
                                            )
                                        }
                                        className="admin-view-button"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                project.id
                                            )
                                        }
                                        className="admin-delete-button"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* =====================================================
                    ADD / EDIT PROJECT FORM
                ===================================================== */}

                {showForm && (

                    <div
                        className="lead-modal-overlay"
                        onClick={handleCloseForm}
                    >

                        <div
                            className="lead-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >


                            {/* MODAL HEADER */}

                            <div className="lead-modal-header">

                                <h2>

                                    {editingProject
                                        ? "Edit Project"
                                        : "Add Project"}

                                </h2>


                                <button
                                    type="button"
                                    onClick={
                                        handleCloseForm
                                    }
                                    className="lead-modal-close"
                                >
                                    ×
                                </button>

                            </div>


                            {/* FORM */}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* PROJECT NAME */}

                                <div
                                    style={{
                                        marginBottom:
                                            "16px"
                                    }}
                                >

                                    <label>
                                        Project Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter project name"
                                        required
                                        style={{
                                            width: "100%",
                                            padding:
                                                "10px",
                                            marginTop:
                                                "6px",
                                            border:
                                                "1px solid #d1d5db",
                                            borderRadius:
                                                "6px"
                                        }}
                                    />

                                </div>


                                {/* CLIENT */}

                                <div
                                    style={{
                                        marginBottom:
                                            "16px"
                                    }}
                                >

                                    <label>
                                        Client
                                    </label>

                                    <input
                                        type="text"
                                        name="client"
                                        value={
                                            formData.client
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter client name"
                                        required
                                        style={{
                                            width: "100%",
                                            padding:
                                                "10px",
                                            marginTop:
                                                "6px",
                                            border:
                                                "1px solid #d1d5db",
                                            borderRadius:
                                                "6px"
                                        }}
                                    />

                                </div>


                                {/* STATUS */}

                                <div
                                    style={{
                                        marginBottom:
                                            "16px"
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
                                        onChange={
                                            handleChange
                                        }
                                        style={{
                                            width: "100%",
                                            padding:
                                                "10px",
                                            marginTop:
                                                "6px",
                                            border:
                                                "1px solid #d1d5db",
                                            borderRadius:
                                                "6px"
                                        }}
                                    >

                                        <option value="Planning">
                                            Planning
                                        </option>

                                        <option value="Design">
                                            Design
                                        </option>

                                        <option value="Development">
                                            Development
                                        </option>

                                        <option value="Testing">
                                            Testing
                                        </option>

                                        <option value="Completed">
                                            Completed
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>


                                {/* PROGRESS */}

                                <div
                                    style={{
                                        marginBottom:
                                            "16px"
                                    }}
                                >

                                    <label>
                                        Progress (%)
                                    </label>

                                    <input
                                        type="number"
                                        name="progress"
                                        value={
                                            formData.progress
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min="0"
                                        max="100"
                                        required
                                        style={{
                                            width: "100%",
                                            padding:
                                                "10px",
                                            marginTop:
                                                "6px",
                                            border:
                                                "1px solid #d1d5db",
                                            borderRadius:
                                                "6px"
                                        }}
                                    />

                                </div>


                                {/* AMOUNT */}

                                <div
                                    style={{
                                        marginBottom:
                                            "16px"
                                    }}
                                >

                                    <label>
                                        Amount
                                    </label>

                                    <input
                                        type="text"
                                        name="amount"
                                        value={
                                            formData.amount
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="₹30,000"
                                        style={{
                                            width: "100%",
                                            padding:
                                                "10px",
                                            marginTop:
                                                "6px",
                                            border:
                                                "1px solid #d1d5db",
                                            borderRadius:
                                                "6px"
                                        }}
                                    />

                                </div>


                                {/* FORM FOOTER */}

                                <div className="lead-modal-footer">

                                    <button
                                        type="button"
                                        onClick={
                                            handleCloseForm
                                        }
                                        className="admin-delete-button"
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="admin-close-button"
                                    >

                                        {editingProject
                                            ? "Update Project"
                                            : "Add Project"}

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


export default Projects;
