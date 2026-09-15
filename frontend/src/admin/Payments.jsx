
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllPayments,
  getAllProjects,
  createPayment,
  updatePayment,
  deletePayment,
} from "../services/api";


function Payments() {

  // =========================================================
  // STATE
  // =========================================================

  const [payments, setPayments] = useState([]);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingPayment, setEditingPayment] =
    useState(null);


  const [formData, setFormData] = useState({

    paymentId: "",

    projectId: "",

    client: "",

    type: "Advance",

    amount: "",

    status: "Pending",

    paymentDate: "",
  });


  // =========================================================
  // ADMIN HEADER SEARCH
  // =========================================================

  const [searchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search") || "";


  // =========================================================
  // LOAD PAYMENTS + PROJECTS
  // =========================================================

  const loadData = async () => {

    try {

      setLoading(true);

      setError("");


      const [
        paymentData,
        projectData,
      ] = await Promise.all([

        getAllPayments(),

        getAllProjects(),

      ]);


      setPayments(
        Array.isArray(paymentData)
          ? paymentData
          : []
      );


      setProjects(
        Array.isArray(projectData)
          ? projectData
          : []
      );

    } catch (err) {

      console.error(
        "Error loading payments:",
        err
      );

      setError(
        "Unable to load payments from MySQL."
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    loadData();

  }, []);


  // =========================================================
  // FORM CHANGE
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
  // ADD PAYMENT
  // =========================================================

  const handleAddPayment = () => {

    setEditingPayment(null);


    setFormData({

      paymentId: "",

      projectId:
        projects.length > 0
          ? String(projects[0].id)
          : "",

      client: "",

      type: "Advance",

      amount: "",

      status: "Pending",

      paymentDate: "",

    });


    setError("");

    setMessage("");

    setShowForm(true);
  };


  // =========================================================
  // EDIT PAYMENT
  // =========================================================

  const handleEditPayment = (
    payment
  ) => {

    setEditingPayment(payment);


    setFormData({

      paymentId:
        payment.paymentId || "",

      projectId:
        String(payment.projectId || ""),

      client:
        payment.client || "",

      type:
        payment.type || "Advance",

      amount:
        payment.amount || "",

      status:
        payment.status || "Pending",

      paymentDate:
        payment.paymentDate || "",

    });


    setError("");

    setMessage("");

    setShowForm(true);
  };


  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCloseForm = () => {

    setShowForm(false);

    setEditingPayment(null);
  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setMessage("");


    try {

      if (!formData.paymentId.trim()) {

        setError(
          "Please enter payment ID."
        );

        return;
      }


      if (!formData.projectId) {

        setError(
          "Please select a project."
        );

        return;
      }


      if (!formData.client.trim()) {

        setError(
          "Please enter client name."
        );

        return;
      }


      if (!formData.amount) {

        setError(
          "Please enter payment amount."
        );

        return;
      }


      let result;


      if (editingPayment) {

        result =
          await updatePayment(
            editingPayment.id,
            formData
          );

      } else {

        result =
          await createPayment(
            formData
          );
      }


      if (
        result &&
        result.success === false
      ) {

        setError(
          result.message ||
          "Payment operation failed."
        );

        return;
      }


      setMessage(

        editingPayment

          ? "Payment updated successfully."

          : "Payment added successfully."

      );


      setShowForm(false);

      setEditingPayment(null);


      await loadData();

    } catch (err) {

      console.error(
        "Error saving payment:",
        err
      );

      setError(
        "Unable to save payment."
      );
    }
  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDeletePayment = async (
    id
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this payment?"
      );


    if (!confirmed) {

      return;
    }


    try {

      setError("");

      setMessage("");


      const result =
        await deletePayment(id);


      if (
        result &&
        result.success === false
      ) {

        setError(
          result.message ||
          "Unable to delete payment."
        );

        return;
      }


      setPayments(

        payments.filter(
          (payment) =>
            payment.id !== id
        )

      );


      setMessage(
        "Payment deleted successfully."
      );

    } catch (err) {

      console.error(
        "Error deleting payment:",
        err
      );

      setError(
        "Unable to delete payment."
      );
    }
  };


  // =========================================================
  // CALCULATE STATISTICS
  // =========================================================

  const totalRevenue =
    payments.reduce(
      (total, payment) =>
        total +
        Number(payment.amount || 0),
      0
    );


  const receivedAmount =
    payments
      .filter(
        (payment) =>
          payment.status === "Paid"
      )
      .reduce(
        (total, payment) =>
          total +
          Number(payment.amount || 0),
        0
      );


  const pendingAmount =
    payments
      .filter(
        (payment) =>
          payment.status === "Pending"
      )
      .reduce(
        (total, payment) =>
          total +
          Number(payment.amount || 0),
        0
      );


  // =========================================================
  // CURRENCY FORMAT
  // =========================================================

  const formatCurrency = (
    amount
  ) => {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(amount);
  };


  // =========================================================
  // FILTER PAYMENTS
  // =========================================================

  const filteredPayments = payments.filter(
    (payment) => {

      const search =
        searchTerm.toLowerCase().trim();


      // Empty search → show all payments

      if (!search) {
        return true;
      }


      const paymentId =
        String(payment.paymentId || "")
          .toLowerCase();

      const client =
        String(payment.client || "")
          .toLowerCase();

      const projectName =
        String(payment.projectName || "")
          .toLowerCase();

      const type =
        String(payment.type || "")
          .toLowerCase();

      const amount =
        String(payment.amount || "")
          .toLowerCase();

      const status =
        String(payment.status || "")
          .toLowerCase();

      const paymentDate =
        String(payment.paymentDate || "")
          .toLowerCase();


      return (
        paymentId.includes(search) ||
        client.includes(search) ||
        projectName.includes(search) ||
        type.includes(search) ||
        amount.includes(search) ||
        status.includes(search) ||
        paymentDate.includes(search)
      );

    }
  );


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="admin-page">

        <div className="admin-container">

          <div className="admin-page-header">

            <div>

              <h1>
                Payments
              </h1>

              <p>
                Track project payments and revenue.
              </p>

            </div>

          </div>


          <div className="admin-panel">

            <p>
              Loading payments...
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


        {/* PAGE HEADER */}

        <div className="admin-page-header">

          <div>

            <h1>
              Payments
            </h1>

            <p>
              Track project payments and revenue.
            </p>

          </div>


          <button
            type="button"
            className="admin-primary-button"
            onClick={handleAddPayment}
          >
            + Add Payment
          </button>

        </div>


        {/* SUCCESS */}

        {message && (

          <div
            style={{
              marginBottom: "15px",
              padding: "12px 15px",
              borderRadius: "8px",
              background: "#f0fdf4",
              color: "#166534",
              border:
                "1px solid #bbf7d0",
              fontSize: "14px",
            }}
          >
            {message}
          </div>

        )}


        {/* ERROR */}

        {error && (

          <div
            style={{
              marginBottom: "15px",
              padding: "12px 15px",
              borderRadius: "8px",
              background: "#fef2f2",
              color: "#b91c1c",
              border:
                "1px solid #fecaca",
              fontSize: "14px",
            }}
          >
            {error}
          </div>

        )}


        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="admin-stats-grid">


          {/* TOTAL */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              💰
            </div>

            <div>

              <p>
                Total Revenue
              </p>

              <h2>
                {formatCurrency(
                  totalRevenue
                )}
              </h2>

            </div>

          </div>


          {/* RECEIVED */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ✅
            </div>

            <div>

              <p>
                Received
              </p>

              <h2>
                {formatCurrency(
                  receivedAmount
                )}
              </h2>

            </div>

          </div>


          {/* PENDING */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              ⏳
            </div>

            <div>

              <p>
                Pending
              </p>

              <h2>
                {formatCurrency(
                  pendingAmount
                )}
              </h2>

            </div>

          </div>


        </div>


        {/* =====================================================
            PAYMENT HISTORY
        ====================================================== */}

        <div className="admin-panel">


          <div className="admin-panel-header">

            <h2>
              Payment History
            </h2>

          </div>


          {/* SEARCH RESULT COUNT */}

          {payments.length > 0 && (

            <div
              style={{
                padding: "0 20px 15px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >

              Showing{" "}

              <strong>
                {filteredPayments.length}
              </strong>

              {" "}of{" "}

              <strong>
                {payments.length}
              </strong>

              {" "}payments

            </div>

          )}


          <div className="admin-table-wrapper">

            <table className="admin-table">


              <thead>

                <tr>

                  <th>
                    Payment ID
                  </th>

                  <th>
                    Client
                  </th>

                  <th>
                    Project
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Amount
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


                {filteredPayments.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "30px",
                      }}
                    >

                      {searchTerm.trim()
                        ? "No matching payments found."
                        : "No payments found."}

                    </td>

                  </tr>

                ) : (

                  filteredPayments.map(
                    (payment) => (

                      <tr
                        key={
                          payment.id
                        }
                      >


                        {/* PAYMENT ID */}

                        <td>
                          {payment.paymentId}
                        </td>


                        {/* CLIENT */}

                        <td>

                          <strong>
                            {payment.client}
                          </strong>

                        </td>


                        {/* PROJECT */}

                        <td>

                          {payment.projectName ||
                            "Unknown Project"}

                        </td>


                        {/* TYPE */}

                        <td>
                          {payment.type}
                        </td>


                        {/* AMOUNT */}

                        <td>

                          <strong>

                            {formatCurrency(
                              payment.amount
                            )}

                          </strong>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              `status ${
                                payment.status ===
                                "Paid"
                                  ? "status-completed"
                                  : "status-pending"
                              }`
                            }
                          >

                            <span className="status-dot"></span>

                            {payment.status}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                            }}
                          >

                            <button
                              type="button"
                              className="admin-view-button"
                              onClick={() =>
                                handleEditPayment(
                                  payment
                                )
                              }
                            >
                              Edit
                            </button>


                            <button
                              type="button"
                              className="admin-delete-button"
                              onClick={() =>
                                handleDeletePayment(
                                  payment.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* =====================================================
            ADD / EDIT MODAL
        ====================================================== */}

        {showForm && (

          <div
            className="lead-modal-overlay"
            onClick={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {

                handleCloseForm();

              }

            }}
          >

            <div className="lead-modal">


              {/* HEADER */}

              <div className="lead-modal-header">

                <h2>

                  {editingPayment
                    ? "Edit Payment"
                    : "Add Payment"}

                </h2>


                <button
                  type="button"
                  className="lead-modal-close"
                  onClick={
                    handleCloseForm
                  }
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


                {/* PAYMENT ID */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >

                  <label>
                    Payment ID
                  </label>

                  <input
                    type="text"
                    name="paymentId"
                    value={
                      formData.paymentId
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Example: PAY004"
                    required
                  />

                </div>


                {/* PROJECT */}

                <div
                  style={{
                    marginBottom:
                      "16px",
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
                    onChange={
                      handleChange
                    }
                    required
                  >

                    <option value="">
                      Select Project
                    </option>


                    {projects.map(
                      (project) => (

                        <option
                          key={
                            project.id
                          }
                          value={
                            project.id
                          }
                        >
                          {project.name}
                        </option>

                      )
                    )}

                  </select>

                </div>


                {/* CLIENT */}

                <div
                  style={{
                    marginBottom:
                      "16px",
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
                  />

                </div>


                {/* TYPE */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >

                  <label>
                    Payment Type
                  </label>

                  <select
                    name="type"
                    value={
                      formData.type
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option value="Advance">
                      Advance
                    </option>

                    <option value="Milestone">
                      Milestone
                    </option>

                    <option value="Full Payment">
                      Full Payment
                    </option>

                  </select>

                </div>


                {/* AMOUNT */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >

                  <label>
                    Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={
                      formData.amount
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                    required
                  />

                </div>


                {/* STATUS */}

                <div
                  style={{
                    marginBottom:
                      "16px",
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
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Failed">
                      Failed
                    </option>

                    <option value="Refunded">
                      Refunded
                    </option>

                  </select>

                </div>


                {/* PAYMENT DATE */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >

                  <label>
                    Payment Date
                  </label>

                  <input
                    type="date"
                    name="paymentDate"
                    value={
                      formData.paymentDate
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>


                {/* FOOTER */}

                <div className="lead-modal-footer">

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={
                      handleCloseForm
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-close-button"
                  >

                    {editingPayment
                      ? "Update Payment"
                      : "Add Payment"}

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


export default Payments;
