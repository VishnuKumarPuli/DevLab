
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllPortfolios,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  updatePortfolioStatus,
} from "../services/api";

function Portfolio() {

  // =========================================================
  // ADMIN HEADER SEARCH
  // =========================================================

  const [searchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search") || "";


  // =========================================================
  // STATE
  // =========================================================

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingProject, setEditingProject] = useState(null);


  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    technologies: "",
    status: "Active",
  });


  // =========================================================
  // IMAGE PATH HELPER
  // =========================================================

  const getImagePath = (image) => {

    if (!image) {
      return "";
    }

    // If image is already a complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // If image is stored as /images/example.jpg
    if (image.startsWith("/")) {
      return image;
    }

    // If image is stored as images/example.jpg
    return `/${image}`;
  };


  // =========================================================
  // PORTFOLIO IMAGE HELPER
  // =========================================================

  const getPortfolioImage = (project) => {

    // Use database image if available
    if (project.image) {
      return getImagePath(project.image);
    }

    const title =
      String(project.title || "").toLowerCase();


    // Business Website
    if (title.includes("business")) {
      return "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80";
    }


    // Restaurant
    if (title.includes("restaurant")) {
      return "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80";
    }


    // E-Commerce
    if (
      title.includes("e-commerce") ||
      title.includes("ecommerce")
    ) {
      return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80";
    }


    // Real Estate
    if (title.includes("real estate")) {
      return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";
    }


    // Doctor Appointment
    if (
      title.includes("doctor") ||
      title.includes("appointment")
    ) {
      return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80";
    }


    // Job Portal
    if (
      title.includes("job") ||
      title.includes("portal")
    ) {
      return "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80";
    }


    // School Management
    if (
      title.includes("school") ||
      title.includes("management")
    ) {
      return "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80";
    }


    // Event Management
    if (title.includes("event")) {
      return "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80";
    }


    // Default image
    return "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80";
  };


  // =========================================================
  // LOAD PORTFOLIO PROJECTS
  // =========================================================

  const loadProjects = async () => {

    try {

      setLoading(true);

      const data = await getAllPortfolios();

      setProjects(data);

    } catch (error) {

      console.error(
        "Error loading portfolio projects:",
        error
      );

      alert("Failed to load portfolio projects.");

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // LOAD ON PAGE OPEN
  // =========================================================

  useEffect(() => {

    loadProjects();

  }, []);


  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredProjects = projects.filter((project) => {

    const search =
      searchTerm.toLowerCase().trim();


    if (!search) {
      return true;
    }


    const title =
      String(project.title || "")
        .toLowerCase();

    const category =
      String(project.category || "")
        .toLowerCase();

    const technology =
      String(project.technologies || "")
        .toLowerCase();

    const status =
      String(project.status || "")
        .toLowerCase();


    return (
      title.includes(search) ||
      category.includes(search) ||
      technology.includes(search) ||
      status.includes(search)
    );

  });


  // =========================================================
  // FORM INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // =========================================================
  // OPEN ADD FORM
  // =========================================================

  const handleAdd = () => {

    setEditingProject(null);

    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
      technologies: "",
      status: "Active",
    });

    setShowForm(true);

  };


  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const handleEdit = (project) => {

    setEditingProject(project);

    setFormData({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      image: project.image || "",
      technologies: project.technologies || "",
      status: project.status || "Active",
    });

    setShowForm(true);

  };


  // =========================================================
  // ADD / UPDATE PROJECT
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    if (!formData.title.trim()) {

      alert("Project title is required.");

      return;

    }


    try {

      setActionLoading(true);


      if (editingProject) {

        await updatePortfolio(
          editingProject.id,
          formData
        );

        alert(
          "Portfolio project updated successfully."
        );

      } else {

        await addPortfolio(formData);

        alert(
          "Portfolio project added successfully."
        );

      }


      setShowForm(false);

      setEditingProject(null);

      await loadProjects();

    } catch (error) {

      console.error(
        "Error saving portfolio project:",
        error
      );

      alert(
        "Failed to save portfolio project."
      );

    } finally {

      setActionLoading(false);

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

      setActionLoading(true);

      await deletePortfolio(id);

      alert(
        "Portfolio project deleted successfully."
      );

      await loadProjects();

    } catch (error) {

      console.error(
        "Error deleting portfolio project:",
        error
      );

      alert(
        "Failed to delete portfolio project."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // =========================================================
  // ENABLE / DISABLE PROJECT
  // =========================================================

  const handleStatusChange = async (
    id,
    currentStatus
  ) => {

    const newStatus =
      currentStatus === "Active"
        ? "Inactive"
        : "Active";


    try {

      setActionLoading(true);

      await updatePortfolioStatus(
        id,
        newStatus
      );

      await loadProjects();

    } catch (error) {

      console.error(
        "Error updating portfolio status:",
        error
      );

      alert(
        "Failed to update project status."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCancel = () => {

    setShowForm(false);

    setEditingProject(null);

  };


  // =========================================================
  // IMAGE ERROR HANDLER
  // =========================================================

  const handleImageError = (event) => {

    event.currentTarget.style.display = "none";

  };


  // =========================================================
  // RENDER
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
              Portfolio
            </h1>

            <p>
              Manage projects displayed in your portfolio.
            </p>

          </div>


          <button
            className="admin-primary-button"
            onClick={handleAdd}
            disabled={actionLoading}
          >
            + Add Project
          </button>

        </div>


        {/* =====================================================
            ADD / EDIT MODAL
        ====================================================== */}

        {showForm && (

          <div
            className="admin-modal-overlay"
            onClick={(event) => {

              if (
                event.target === event.currentTarget &&
                !actionLoading
              ) {
                handleCancel();
              }

            }}
          >

            <div className="admin-modal">


              {/* MODAL HEADER */}

              <div className="admin-modal-header">

                <h2>
                  {editingProject
                    ? "Edit Portfolio Project"
                    : "Add Portfolio Project"}
                </h2>


                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={handleCancel}
                  disabled={actionLoading}
                >
                  ×
                </button>

              </div>


              {/* FORM */}

              <form
                className="admin-form"
                onSubmit={handleSubmit}
              >


                {/* TITLE */}

                <div className="admin-form-group">

                  <label>
                    Project Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                    required
                  />

                </div>


                {/* CATEGORY */}

                <div className="admin-form-group">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Example: Business"
                  />

                </div>


                {/* DESCRIPTION */}

                <div className="admin-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter project description"
                    rows="4"
                  />

                </div>


                {/* IMAGE */}

                <div className="admin-form-group">

                  <label>
                    Image Path
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/images/business.jpg"
                  />

                  <small>
                    Example: /images/business.jpg
                  </small>


                  {/* IMAGE PREVIEW */}

                  {formData.image && (

                    <div
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        height: "160px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                        background: "#f8fafc",
                      }}
                    >

                      <img
                        src={getImagePath(formData.image)}
                        alt="Project preview"
                        onError={handleImageError}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                    </div>

                  )}

                </div>


                {/* TECHNOLOGIES */}

                <div className="admin-form-group">

                  <label>
                    Technologies
                  </label>

                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="Example: React,Java,MySQL"
                  />

                </div>


                {/* STATUS */}

                <div className="admin-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>


                {/* FORM ACTIONS */}

                <div className="admin-form-actions">

                  <button
                    type="button"
                    className="admin-small-button"
                    onClick={handleCancel}
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-primary-button"
                    disabled={actionLoading}
                  >
                    {actionLoading
                      ? "Saving..."
                      : editingProject
                      ? "Update Project"
                      : "Add Project"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}


        {/* =====================================================
            SEARCH RESULT COUNT
        ====================================================== */}

        {projects.length > 0 && (

          <div className="admin-search-result-text">

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
        ====================================================== */}

        {loading ? (

          <div className="admin-panel admin-portfolio-loading">

            Loading portfolio projects...

          </div>

        ) : (


          /* =====================================================
             PORTFOLIO GRID
          ===================================================== */

          <div className="admin-portfolio-grid">

            {filteredProjects.length === 0 ? (

              <div className="admin-portfolio-empty">

                <div className="admin-portfolio-empty-icon">
                  🖥️
                </div>

                <h3>
                  No portfolio projects found
                </h3>

                <p>
                  {searchTerm.trim()
                    ? "Try a different search."
                    : "Add your first portfolio project."}
                </p>

              </div>

            ) : (

              filteredProjects.map((project) => (

                <div
                  className="admin-portfolio-card"
                  key={project.id}
                >


                  {/* PROJECT IMAGE */}

                  <div className="admin-portfolio-image">

                    <img
                      src={getPortfolioImage(project)}
                      alt={project.title}
                      onError={handleImageError}
                    />

                  </div>


                  {/* PROJECT CONTENT */}

                  <div className="admin-portfolio-content">

                    <span>
                      {project.category || "Web Development"}
                    </span>


                    <h3>
                      {project.title}
                    </h3>


                    <p>
                      {project.technologies || "No technologies added"}
                    </p>


                    {/* ACTIONS */}

                    <div className="portfolio-card-actions">


                      {/* STATUS */}

                      <span
                        className={
                          project.status === "Active"
                            ? "status status-completed"
                            : "status"
                        }
                      >
                        {project.status}
                      </span>


                      {/* EDIT */}

                      <button
                        className="admin-small-button"
                        onClick={() =>
                          handleEdit(project)
                        }
                        disabled={actionLoading}
                      >
                        Edit
                      </button>


                      {/* ENABLE / DISABLE */}

                      <button
                        className="admin-small-button"
                        onClick={() =>
                          handleStatusChange(
                            project.id,
                            project.status
                          )
                        }
                        disabled={actionLoading}
                      >
                        {project.status === "Active"
                          ? "Disable"
                          : "Enable"}
                      </button>


                      {/* DELETE */}

                      <button
                        className="admin-small-button"
                        onClick={() =>
                          handleDelete(project.id)
                        }
                        disabled={actionLoading}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Portfolio;
