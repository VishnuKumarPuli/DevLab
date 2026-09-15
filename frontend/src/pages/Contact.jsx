
import { useState } from "react";
import Button from "../components/Button";
import { addMessage } from "../services/api";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {

      setLoading(true);

      await addMessage(formData);

      setSuccess(
        "Your message has been sent successfully!"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (err) {

      console.error("Error sending message:", err);

      setError(
        "Failed to send message. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="page">

      <section className="page-header">
        <div className="container">

          <span className="section-subtitle">Contact</span>

          <h1>Let's Talk About Your Project</h1>

          <p>
            Have a question or website idea? Get in touch.
          </p>

        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">

          {/* Contact Information */}
          <div className="contact-info">

            <span className="section-subtitle">
              Get In Touch
            </span>

            <h2>Let's Build Something Great</h2>

            <p>
              Tell me about your business and what you want your website
              to achieve.
            </p>

            <div className="contact-item">
              <span>📧</span>
              <div>
                <h4>Email</h4>
                <p>pulivishnug@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <span>📱</span>
              <div>
                <h4>Phone</h4>
                <p>+91 9440034238</p>
              </div>
            </div>

            <div className="contact-item">
              <span>📍</span>
              <div>
                <h4>Location</h4>
                <p>Hyderabad,Telangana,India</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="form-card">

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can I help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Success Message */}
              {success && (
                <p className="contact-success">
                  {success}
                </p>
              )}

              {/* Error Message */}
              {error && (
                <p className="contact-error">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>

            </form>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;
