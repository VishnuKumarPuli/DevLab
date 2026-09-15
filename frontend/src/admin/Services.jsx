
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../services/api";

function Services() {

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    active: true,
  });

  // Loading state for individual service actions
  const [actionLoading, setActionLoading] = useState(null);

  // Loading state for Add / Update
  const [submitLoading, setSubmitLoading] = useState(false);


  // ================================
  // ADMIN HEADER SEARCH
  // ================================

  const [searchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search") || "";


  // ================================
  // LOAD SERVICES
  // ================================

  const loadServices = async () => {

    try {

      setLoading(true);

      const data = await getAllServices();

      setServices(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Failed to load services:", error);

      alert("Unable to load services.");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadServices();
  }, []);


  // ================================
  // ADD SERVICE
  // ================================

  const handleAddService = () => {

    setEditingService(null);

    setFormData({
      name: "",
      price: "",
      active: true,
    });

    setShowModal(true);
  };


  // ================================
  // EDIT SERVICE
  // ================================

  const handleEditService = (service) => {

    if (actionLoading !== null) {
      return;
    }

    setEditingService(service);

    setFormData({
      name: service.name,
      price: service.price,
      active: service.active,
    });

    setShowModal(true);
  };


  // ================================
  // FORM INPUT
  // ================================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  // ================================
  // SAVE SERVICE
  // ================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {

      alert("Please enter service name.");

      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {

      alert("Please enter a valid price.");

      return;
    }


    try {

      setSubmitLoading(true);


      if (editingService) {

        // UPDATE
        await updateService(
          editingService.id,
          {
            name: formData.name,
            price: formData.price,
            active: formData.active,
          }
        );

        alert("Service updated successfully.");

      } else {

        // ADD
        await createService({
          name: formData.name,
          price: formData.price,
          active: formData.active,
        });

        alert("Service added successfully.");
      }


      setShowModal(false);

      setEditingService(null);

      setFormData({
        name: "",
        price: "",
        active: true,
      });

      await loadServices();

    } catch (error) {

      console.error("Service save error:", error);

      alert("Unable to save service.");

    } finally {

      setSubmitLoading(false);

    }
  };


  // ================================
  // ENABLE / DISABLE
  // ================================

  const toggleService = async (service) => {

    if (actionLoading !== null) {
      return;
    }


    try {

      setActionLoading({
        id: service.id,
        action: service.active
          ? "disable"
          : "enable",
      });


      await updateService(
        service.id,
        {
          name: service.name,
          price: service.price,
          active: !service.active,
        }
      );


      await loadServices();

    } catch (error) {

      console.error(
        "Status update error:",
        error
      );

      alert("Unable to update service status.");

    } finally {

      setActionLoading(null);

    }
  };


  // ================================
  // DELETE SERVICE
  // ================================

  const handleDeleteService = async (id) => {

    if (actionLoading !== null) {
      return;
    }


    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }


    try {

      setActionLoading({
        id: id,
        action: "delete",
      });


      await deleteService(id);

      alert("Service deleted successfully.");

      await loadServices();

    } catch (error) {

      console.error(
        "Delete service error:",
        error
      );

      alert("Unable to delete service.");

    } finally {

      setActionLoading(null);

    }
  };


  // ================================
  // FILTER SERVICES
  // ================================

  const filteredServices = services.filter((service) => {

    const search =
      searchTerm.toLowerCase().trim();


    // Show all services when search is empty

    if (!search) {
      return true;
    }


    const name =
      String(service.name || "")
        .toLowerCase();

    const price =
      String(service.price || "")
        .toLowerCase();

    const status =
      service.active
        ? "active"
        : "inactive";


    return (
      name.includes(search) ||
      price.includes(search) ||
      status.includes(search)
    );

  });


  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* ================================
            PAGE HEADER
        ================================= */}

        <div className="admin-page-header">

          <div>

            <h1>Services</h1>

            <p>
              Manage services displayed on your website.
            </p>

          </div>


          <button
            type="button"
            className="admin-primary-button"
            onClick={handleAddService}
            disabled={
              submitLoading ||
              actionLoading !== null
            }
          >
            + Add Service
          </button>

        </div>


        {/* ================================
            SEARCH RESULT COUNT
        ================================= */}

        {!loading && services.length > 0 && (

          <div
            style={{
              marginBottom: "15px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >

            Showing{" "}

            <strong>
              {filteredServices.length}
            </strong>

            {" "}of{" "}

            <strong>
              {services.length}
            </strong>

            {" "}services

          </div>

        )}


        {/* ================================
            SERVICES TABLE
        ================================= */}

        <div className="admin-panel">

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>Service</th>

                  <th>Starting Price</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      Loading services...
                    </td>

                  </tr>

                ) : filteredServices.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      style={{ textAlign: "center" }}
                    >

                      {searchTerm.trim()
                        ? "No matching services found."
                        : "No services found."}

                    </td>

                  </tr>

                ) : (

                  filteredServices.map((service) => {

                    const isActionLoading =
                      actionLoading?.id === service.id;

                    const isDisabling =
                      isActionLoading &&
                      actionLoading.action === "disable";

                    const isEnabling =
                      isActionLoading &&
                      actionLoading.action === "enable";

                    const isDeleting =
                      isActionLoading &&
                      actionLoading.action === "delete";


                    return (

                      <tr key={service.id}>

                        {/* SERVICE NAME */}

                        <td>

                          <strong>
                            {service.name}
                          </strong>

                        </td>


                        {/* PRICE */}

                        <td>

                          ₹
                          {Number(
                            service.price || 0
                          ).toLocaleString("en-IN")}

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              service.active
                                ? "status status-completed"
                                : "status status-rejected"
                            }
                          >

                            {service.active
                              ? "Active"
                              : "Inactive"}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="service-actions">

                          {/* EDIT */}

                          <button
                            type="button"
                            className="service-edit-button"
                            onClick={() =>
                              handleEditService(service)
                            }
                            disabled={
                              actionLoading !== null ||
                              submitLoading
                            }
                          >

                            Edit

                          </button>


                          {/* ENABLE / DISABLE */}

                          <button
                            type="button"
                            className={
                              service.active
                                ? "service-disable-button"
                                : "service-enable-button"
                            }
                            onClick={() =>
                              toggleService(service)
                            }
                            disabled={
                              actionLoading !== null ||
                              submitLoading
                            }
                          >

                            {isDisabling
                              ? "Disabling..."
                              : isEnabling
                              ? "Enabling..."
                              : service.active
                              ? "Disable"
                              : "Enable"}

                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            className="admin-delete-button"
                            onClick={() =>
                              handleDeleteService(
                                service.id
                              )
                            }
                            disabled={
                              actionLoading !== null ||
                              submitLoading
                            }
                          >

                            {isDeleting
                              ? "Deleting..."
                              : "Delete"}

                          </button>

                        </td>

                      </tr>

                    );

                  })

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* =====================================
          ADD / EDIT SERVICE MODAL
      ====================================== */}

      {showModal && (

        <div className="lead-modal-overlay">

          <div className="lead-modal">

            {/* MODAL HEADER */}

            <div className="lead-modal-header">

              <h2>

                {editingService
                  ? "Edit Service"
                  : "Add Service"}

              </h2>


              <button
                type="button"
                className="lead-modal-close"
                onClick={() =>
                  setShowModal(false)
                }
                disabled={submitLoading}
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <form onSubmit={handleSubmit}>

              <div className="lead-modal-body">

                {/* SERVICE NAME */}

                <div className="form-group">

                  <label>
                    Service Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter service name"
                    disabled={submitLoading}
                    required
                  />

                </div>


                {/* PRICE */}

                <div className="form-group">

                  <label>
                    Starting Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter starting price"
                    min="0"
                    step="0.01"
                    disabled={submitLoading}
                    required
                  />

                </div>


                {/* STATUS */}

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="active"
                    value={String(
                      formData.active
                    )}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        active:
                          e.target.value ===
                          "true",
                      })
                    }
                    disabled={submitLoading}
                  >

                    <option value="true">
                      Active
                    </option>

                    <option value="false">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>


              {/* MODAL FOOTER */}

              <div className="lead-modal-footer">

                <button
                  type="button"
                  className="admin-close-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  disabled={submitLoading}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={submitLoading}
                >

                  {submitLoading
                    ? editingService
                      ? "Updating..."
                      : "Adding..."
                    : editingService
                    ? "Update Service"
                    : "Add Service"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Services;
