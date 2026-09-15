import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams
} from "react-router-dom";

import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
} from "../services/api";


function Testimonials() {


  // =========================================
  // SEARCH FROM ADMIN HEADER
  // =========================================

  const [searchParams] =
    useSearchParams();

  const searchTerm =
    searchParams.get("search") || "";


  // =========================================
  // STATE
  // =========================================

  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingTestimonial, setEditingTestimonial] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
    status: "ACTIVE",
  });


  // =========================================
  // FILTER TESTIMONIALS
  // =========================================

  const filteredTestimonials =
    testimonials.filter((testimonial) => {

      const search =
        searchTerm
          .toLowerCase()
          .trim();

      if (!search) {
        return true;
      }

      const name =
        String(
          testimonial.name || ""
        ).toLowerCase();

      const role =
        String(
          testimonial.role || ""
        ).toLowerCase();

      const message =
        String(
          testimonial.message || ""
        ).toLowerCase();

      const rating =
        String(
          testimonial.rating || ""
        ).toLowerCase();

      const status =
        String(
          testimonial.status || ""
        ).toLowerCase();

      return (
        name.includes(search) ||
        role.includes(search) ||
        message.includes(search) ||
        rating.includes(search) ||
        status.includes(search)
      );

    });


  // =========================================
  // LOAD TESTIMONIALS
  // =========================================

  const loadTestimonials = async () => {

    try {

      setLoading(true);

      const data =
        await getAllTestimonials();

      console.log(
        "Testimonials API Response:",
        data
      );

      if (Array.isArray(data)) {

        setTestimonials(data);

      } else if (data.testimonials) {

        setTestimonials(
          data.testimonials
        );

      } else {

        setTestimonials([]);

      }

    } catch (error) {

      console.error(
        "Error loading testimonials:",
        error
      );

      alert(
        "Failed to load testimonials."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // LOAD WHEN PAGE OPENS
  // =========================================

  useEffect(() => {

    loadTestimonials();

  }, []);


  // =========================================
  // HANDLE INPUT
  // =========================================

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


  // =========================================
  // ADD TESTIMONIAL
  // =========================================

  const handleAdd = () => {

    setEditingTestimonial(null);

    setFormData({
      name: "",
      role: "",
      message: "",
      rating: 5,
      status: "ACTIVE",
    });

    setShowModal(true);

  };


  // =========================================
  // EDIT TESTIMONIAL
  // =========================================

  const handleEdit = (testimonial) => {

    setEditingTestimonial(
      testimonial
    );

    setFormData({
      name: testimonial.name || "",
      role: testimonial.role || "",
      message: testimonial.message || "",
      rating: testimonial.rating || 5,
      status:
        testimonial.status || "ACTIVE",
    });

    setShowModal(true);

  };


  // =========================================
  // CLOSE MODAL
  // =========================================

  const handleCloseModal = () => {

    setShowModal(false);

    setEditingTestimonial(null);

  };


  // =========================================
  // SAVE TESTIMONIAL
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingTestimonial) {

        await updateTestimonial(
          editingTestimonial.id,
          formData
        );

        alert(
          "Testimonial updated successfully."
        );

      } else {

        await createTestimonial(
          formData
        );

        alert(
          "Testimonial added successfully."
        );

      }

      handleCloseModal();

      await loadTestimonials();

    } catch (error) {

      console.error(
        "Error saving testimonial:",
        error
      );

      alert(
        "Failed to save testimonial."
      );

    }

  };


  // =========================================
  // TOGGLE STATUS
  // =========================================

  const handleStatusToggle =
    async (testimonial) => {

      const currentStatus =
        String(
          testimonial.status || ""
        ).toUpperCase();

      const newStatus =
        currentStatus === "ACTIVE"
          ? "INACTIVE"
          : "ACTIVE";

      try {

        await updateTestimonialStatus(
          testimonial.id,
          newStatus
        );

        await loadTestimonials();

      } catch (error) {

        console.error(
          "Error updating testimonial status:",
          error
        );

        alert(
          "Failed to update testimonial status."
        );

      }

    };


  // =========================================
  // DELETE TESTIMONIAL
  // =========================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      );

    if (!confirmed) {

      return;

    }

    try {

      await deleteTestimonial(id);

      alert(
        "Testimonial deleted successfully."
      );

      await loadTestimonials();

    } catch (error) {

      console.error(
        "Error deleting testimonial:",
        error
      );

      alert(
        "Failed to delete testimonial."
      );

    }

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="admin-page">

        <div className="admin-container">

          <div className="admin-page-header">

            <div>

              <h1>
                Testimonials
              </h1>

              <p>
                Manage customer testimonials.
              </p>

            </div>

          </div>

          <p>
            Loading testimonials...
          </p>

        </div>

      </div>
    );

  }


  // =========================================
  // MAIN UI
  // =========================================

  return (
    <div className="admin-page">

      <div className="admin-container">


        {/* PAGE HEADER */}

        <div className="admin-page-header">

          <div>

            <h1>
              Testimonials
            </h1>

            <p>
              Manage customer testimonials.
            </p>

          </div>


          <button
            className="admin-primary-button"
            onClick={handleAdd}
          >
            + Add Testimonial
          </button>

        </div>


        {/* SEARCH RESULT INFO */}

        {searchTerm && (

          <p className="admin-search-result-text">

            Showing results for:
            <strong> "{searchTerm}"</strong>

          </p>

        )}


        {/* TESTIMONIAL CARDS */}

        <div className="admin-testimonials-grid">

          {testimonials.length === 0 ? (

            <p>
              No testimonials found.
            </p>

          ) : filteredTestimonials.length === 0 ? (

            <div className="testimonial-no-results">

              <h3>
                No matching testimonials found
              </h3>

              <p>
                No testimonial matches
                "{searchTerm}".
              </p>

            </div>

          ) : (

            filteredTestimonials.map(
              (testimonial) => {

                const status =
                  String(
                    testimonial.status || ""
                  ).toUpperCase();

                const displayStatus =
                  status === "ACTIVE"
                    ? "Published"
                    : "Inactive";


                return (

                  <div
                    className="admin-testimonial-card"
                    key={testimonial.id}
                  >


                    {/* STARS */}

                    <div className="testimonial-stars">

                      {"★".repeat(
                        Number(
                          testimonial.rating || 0
                        )
                      )}

                    </div>


                    {/* MESSAGE */}

                    <div className="testimonial-message">

                      <p>
                        {testimonial.message}
                      </p>

                    </div>


                    {/* CLIENT */}

                    <div className="testimonial-client">

                      <div className="admin-avatar">

                        {testimonial.name
                          ? testimonial.name.charAt(0)
                          : "?"}

                      </div>


                      <div>

                        <strong>
                          {testimonial.name}
                        </strong>

                        <span>
                          {testimonial.role}
                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="testimonial-actions">


                      {/* STATUS */}

                      <button
                        className="status status-completed"
                        onClick={() =>
                          handleStatusToggle(
                            testimonial
                          )
                        }
                      >

                        {displayStatus}

                      </button>


                      {/* EDIT */}

                      <button
                        className="testimonial-edit-button"
                        onClick={() =>
                          handleEdit(
                            testimonial
                          )
                        }
                      >
                        Edit
                      </button>


                      {/* DELETE */}

                      <button
                        className="testimonial-delete-button"
                        onClick={() =>
                          handleDelete(
                            testimonial.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                );

              }
            )

          )}

        </div>


        {/* ADD / EDIT MODAL */}

        {showModal && (

          <div
            className="admin-modal-overlay"
            onClick={handleCloseModal}
          >

            <div
              className="admin-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >


              {/* MODAL HEADER */}

              <div className="admin-modal-header">

                <h2>

                  {editingTestimonial
                    ? "Edit Testimonial"
                    : "Add Testimonial"}

                </h2>


                <button
                  className="admin-modal-close"
                  onClick={handleCloseModal}
                >
                  ×
                </button>

              </div>


              {/* FORM */}

              <form
                className="admin-form"
                onSubmit={handleSubmit}
              >


                {/* NAME */}

                <div className="admin-form-group">

                  <label>
                    Customer Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    required
                  />

                </div>


                {/* ROLE */}

                <div className="admin-form-group">

                  <label>
                    Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter customer role"
                    required
                  />

                </div>


                {/* MESSAGE */}

                <div className="admin-form-group">

                  <label>
                    Testimonial
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter testimonial"
                    rows="5"
                    required
                  />

                </div>


                {/* RATING */}

                <div className="admin-form-group">

                  <label>
                    Rating
                  </label>

                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  >

                    <option value="1">
                      1 Star
                    </option>

                    <option value="2">
                      2 Stars
                    </option>

                    <option value="3">
                      3 Stars
                    </option>

                    <option value="4">
                      4 Stars
                    </option>

                    <option value="5">
                      5 Stars
                    </option>

                  </select>

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

                    <option value="ACTIVE">
                      Active
                    </option>

                    <option value="INACTIVE">
                      Inactive
                    </option>

                  </select>

                </div>


                {/* FORM ACTIONS */}

                <div className="admin-form-actions">

                  <button
                    type="button"
                    className="admin-small-button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-primary-button"
                  >

                    {editingTestimonial
                      ? "Update Testimonial"
                      : "Add Testimonial"}

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


export default Testimonials;