
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllLeads,
  updateLeadStatus,
  deleteLead
} from "../services/api";


function Leads() {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // HEADER SEARCH
  // =========================================================

  // Search comes ONLY from AdminHeader.
  //
  // Example:
  // /admin/leads?search=ramana
  //
  // There is NO search input inside this page.

  const [searchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search") || "";


  // =========================================================
  // SELECTED LEAD
  // =========================================================

  const [selectedLead, setSelectedLead] =
    useState(null);


  // =========================================================
  // LOAD LEADS
  // =========================================================

  useEffect(() => {

    const loadLeads = async () => {

      try {

        const data = await getAllLeads();

        console.log(
          "Leads from server:",
          data
        );

        setLeads(data);

      } catch (error) {

        console.error(
          "Error loading leads:",
          error
        );

      } finally {

        setLoading(false);
      }
    };


    loadLeads();

  }, []);


  // =========================================================
  // UPDATE LEAD STATUS
  // =========================================================

  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

      console.log(
        "Updating lead:",
        id,
        "Status:",
        status
      );


      const result =
        await updateLeadStatus(
          id,
          status
        );


      console.log(
        "Update response:",
        result
      );


      if (result.success) {

        setLeads(
          (previousLeads) =>
            previousLeads.map(
              (lead) =>
                lead.id === id
                  ? {
                      ...lead,
                      status: status
                    }
                  : lead
            )
        );


        // Also update selected lead
        // if the modal is currently open.

        setSelectedLead(
          (previousLead) =>
            previousLead &&
            previousLead.id === id
              ? {
                  ...previousLead,
                  status: status
                }
              : previousLead
        );


        alert(
          "Lead status updated successfully!"
        );

      } else {

        alert(
          result.message ||
          "Unable to update lead status."
        );

      }

    } catch (error) {

      console.error(
        "Error updating lead status:",
        error
      );


      alert(
        "Unable to update lead status."
      );
    }
  };


  // =========================================================
  // DELETE LEAD
  // =========================================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this lead?"
      );


    if (!confirmDelete) {

      return;
    }


    try {

      console.log(
        "Deleting lead:",
        id
      );


      const result =
        await deleteLead(id);


      console.log(
        "Delete response:",
        result
      );


      if (result.success) {

        setLeads(
          (previousLeads) =>
            previousLeads.filter(
              (lead) =>
                lead.id !== id
            )
        );


        // Close modal if deleted lead
        // was currently open.

        if (
          selectedLead &&
          selectedLead.id === id
        ) {

          setSelectedLead(null);
        }


        alert(
          "Lead deleted successfully!"
        );

      } else {

        alert(
          result.message ||
          "Unable to delete lead."
        );

      }

    } catch (error) {

      console.error(
        "Error deleting lead:",
        error
      );


      alert(
        "Unable to delete lead."
      );
    }
  };


  // =========================================================
  // OPEN VIEW MODAL
  // =========================================================

  const handleView = (lead) => {

    setSelectedLead(lead);

  };


  // =========================================================
  // CLOSE VIEW MODAL
  // =========================================================

  const handleCloseModal = () => {

    setSelectedLead(null);

  };


  // =========================================================
  // FILTER LEADS
  // =========================================================

  // IMPORTANT:
  //
  // This search uses the AdminHeader search.
  //
  // It searches ONLY the leads loaded on this page.
  //
  // No backend/global search is performed.

  const filteredLeads = leads.filter(
    (lead) => {

      const search =
        searchTerm
          .toLowerCase()
          .trim();


      if (!search) {

        return true;
      }


      const name =
        String(lead.name || "")
          .toLowerCase();

      const email =
        String(lead.email || "")
          .toLowerCase();

      const phone =
        String(lead.phone || "")
          .toLowerCase();

      const service =
        String(lead.service || "")
          .toLowerCase();

      const budget =
        String(lead.budget || "")
          .toLowerCase();

      const status =
        String(lead.status || "")
          .toLowerCase();

      const message =
        String(lead.message || "")
          .toLowerCase();


      return (
        name.includes(search) ||
        email.includes(search) ||
        phone.includes(search) ||
        service.includes(search) ||
        budget.includes(search) ||
        status.includes(search) ||
        message.includes(search)
      );
    }
  );


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
              Leads
            </h1>

            <p>
              Manage customer enquiries and project requests.
            </p>

          </div>

        </div>


        {/* =====================================================
            SEARCH RESULT INFORMATION
        ===================================================== */}

        {!loading &&
          leads.length > 0 &&
          searchTerm.trim() !== "" && (

          <div className="project-result-info">

            Showing{" "}

            <strong>
              {filteredLeads.length}
            </strong>

            {" "}of{" "}

            <strong>
              {leads.length}
            </strong>

            {" "}leads

          </div>

        )}


        {/* =====================================================
            LEADS TABLE
        ===================================================== */}

        <div className="admin-panel">

          <div className="admin-table-wrapper">

            {loading ? (

              <p>
                Loading leads...
              </p>

            ) : leads.length === 0 ? (

              <p>
                No leads found.
              </p>

            ) : filteredLeads.length === 0 ? (

              /* =================================================
                 NO SEARCH RESULTS
              ================================================= */

              <div className="project-no-results">

                <div className="project-no-results-icon">
                  🔍
                </div>

                <h3>
                  No leads found
                </h3>

                <p>
                  No leads match your current search.
                </p>

              </div>

            ) : (

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>
                      Client
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Phone
                    </th>

                    <th>
                      Project
                    </th>

                    <th>
                      Budget
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

                  {filteredLeads.map(
                    (lead) => (

                    <tr
                      key={lead.id}
                    >

                      {/* CLIENT */}

                      <td>

                        <strong>
                          {lead.name}
                        </strong>

                      </td>


                      {/* EMAIL */}

                      <td>
                        {lead.email}
                      </td>


                      {/* PHONE */}

                      <td>
                        {lead.phone}
                      </td>


                      {/* PROJECT / SERVICE */}

                      <td>
                        {lead.service}
                      </td>


                      {/* BUDGET */}

                      <td>
                        {lead.budget}
                      </td>


                      {/* STATUS */}

                      <td>

                        <select
                          value={
                            lead.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="admin-select"
                        >

                          <option value="New">
                            New
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="In Discussion">
                            In Discussion
                          </option>

                          <option value="Converted">
                            Converted
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                        </select>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px"
                          }}
                        >

                          <button
                            type="button"
                            onClick={() =>
                              handleView(lead)
                            }
                            className="admin-view-button"
                          >
                            View
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                lead.id
                              )
                            }
                            className="admin-delete-button"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          VIEW LEAD MODAL
      ===================================================== */}

      {selectedLead && (

        <div
          className="lead-modal-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="lead-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="lead-modal-header">

              <h2>
                Lead Details
              </h2>


              <button
                type="button"
                onClick={
                  handleCloseModal
                }
                className="lead-modal-close"
              >
                ×
              </button>

            </div>


            {/* =================================================
                LEAD INFORMATION
            ================================================= */}

            <div className="lead-details">


              {/* NAME */}

              <div className="lead-detail-row">

                <strong>
                  Name
                </strong>

                <span>
                  {selectedLead.name}
                </span>

              </div>


              {/* EMAIL */}

              <div className="lead-detail-row">

                <strong>
                  Email
                </strong>

                <span>
                  {selectedLead.email}
                </span>

              </div>


              {/* PHONE */}

              <div className="lead-detail-row">

                <strong>
                  Phone
                </strong>

                <span>
                  {selectedLead.phone ||
                    "Not provided"}
                </span>

              </div>


              {/* SERVICE */}

              <div className="lead-detail-row">

                <strong>
                  Service
                </strong>

                <span>
                  {selectedLead.service}
                </span>

              </div>


              {/* BUDGET */}

              <div className="lead-detail-row">

                <strong>
                  Budget
                </strong>

                <span>
                  {selectedLead.budget ||
                    "Not provided"}
                </span>

              </div>


              {/* STATUS */}

              <div className="lead-detail-row">

                <strong>
                  Status
                </strong>

                <span>
                  {selectedLead.status}
                </span>

              </div>


              {/* MESSAGE */}

              <div className="lead-detail-message">

                <strong>
                  Message
                </strong>

                <p>
                  {selectedLead.message ||
                    "No message provided."}
                </p>

              </div>

            </div>


            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div className="lead-modal-footer">

              <button
                type="button"
                onClick={
                  handleCloseModal
                }
                className="admin-close-button"
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


export default Leads;
