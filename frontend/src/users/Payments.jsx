import { useEffect, useState } from "react";
import "../styles/user-payments.css";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://devlab-backend-4d8f.onrender.com/Backend/api/user/payments",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load payments");
      }

      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setError("Unable to load payments");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "";

    const value = status.toLowerCase();

    if (value === "paid") return "paid";
    if (value === "pending") return "pending";
    if (value === "failed") return "failed";
    if (value === "cancelled") return "cancelled";

    return "";
  };

  const totalAmount = payments.reduce(
    (total, payment) =>
      total + Number(payment.amount || 0),
    0
  );

  const paidAmount = payments
    .filter(
      (payment) =>
        payment.status &&
        payment.status.toLowerCase() === "paid"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  const pendingAmount = payments
    .filter(
      (payment) =>
        payment.status &&
        payment.status.toLowerCase() === "pending"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="user-payments-page">
        <div className="user-payments-loading">
          <div className="user-payments-spinner"></div>
          <p>Loading your payments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-payments-page">
        <div className="user-payments-error">
          <h3>Unable to load payments</h3>
          <p>{error}</p>

          <button onClick={fetchPayments}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-payments-page">

      {/* PAGE HEADER */}
      <div className="user-payments-header">
        <div>
          <span className="user-payments-label">
            PAYMENTS
          </span>

          <h2>Payment History</h2>

          <p>
            View your DevLab project payments and
            transaction history.
          </p>
        </div>
      </div>


      {/* SUMMARY */}
      <div className="user-payments-summary">

        <div className="user-payment-summary-card">
          <div className="user-payment-summary-icon">
            ₹
          </div>

          <div>
            <span>Total Payments</span>
            <strong>{payments.length}</strong>
          </div>
        </div>


        <div className="user-payment-summary-card">
          <div className="user-payment-summary-icon">
            ✓
          </div>

          <div>
            <span>Paid Amount</span>
            <strong>{formatAmount(paidAmount)}</strong>
          </div>
        </div>


        <div className="user-payment-summary-card">
          <div className="user-payment-summary-icon">
            ◐
          </div>

          <div>
            <span>Pending Amount</span>
            <strong>{formatAmount(pendingAmount)}</strong>
          </div>
        </div>

      </div>


      {/* PAYMENT SECTION */}
      <div className="user-payments-section">

        <div className="user-payments-section-header">
          <div>
            <h3>All Payments</h3>

            <p>
              Payments related to your DevLab projects.
            </p>
          </div>

          <div className="user-payments-total">
            Total: {formatAmount(totalAmount)}
          </div>
        </div>


        {payments.length === 0 ? (

          <div className="user-payments-empty">

            <div className="user-payments-empty-icon">
              ₹
            </div>

            <h3>No Payments Yet</h3>

            <p>
              Your project payments will appear here
              once they are recorded.
            </p>

          </div>

        ) : (

          <div className="user-payments-list">

            {payments.map((payment) => (

              <div
                className="user-payment-card"
                key={payment.id}
              >

                <div className="user-payment-main">

                  <div className="user-payment-icon">
                    ₹
                  </div>

                  <div className="user-payment-info">

                    <div className="user-payment-title-row">

                      <h3>
                        {payment.type || "Payment"}
                      </h3>

                      <span
                        className={`user-payment-status ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status || "Pending"}
                      </span>

                    </div>

                    <div className="user-payment-meta">

                      <span>
                        Payment ID:{" "}
                        {payment.paymentId || "N/A"}
                      </span>

                      <span>
                        Project #{payment.projectId || "N/A"}
                      </span>

                      <span>
                        Date:{" "}
                        {payment.paymentDate || "Not available"}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="user-payment-amount">

                  <strong>
                    {formatAmount(payment.amount)}
                  </strong>

                  <span>
                    {payment.client}
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

export default Payments;