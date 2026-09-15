
import { useState } from "react";
import Button from "../components/Button";
import { createLead } from "../services/api";

function Quote() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    features: "",
    description: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Data required by Java LeadServlet
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.projectType,
        budget: formData.budget,
        message: formData.description
      };

      console.log("Sending lead:", leadData);

      // Send data to Java Servlet
      const result = await createLead(leadData);

      console.log("Server response:", result);

      if (result.success) {

        alert("Project request submitted successfully!");

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          features: "",
          description: ""
        });

      } else {

        alert(result.message || "Unable to submit project request.");

      }

    } catch (error) {

      console.error("Error submitting lead:", error);

      alert(
        "Unable to connect to the server. Make sure Tomcat is running."
      );
    }
  };

  return (
    <div className="page">

      {/* Page Header */}

      <section className="page-header">

        <div className="container">

          <span className="section-subtitle">
            Start Your Project
          </span>

          <h1>Request a Website Quote</h1>

          <p>
            Tell me about your project and I will review your requirements.
          </p>

        </div>

      </section>


      {/* Quote Form */}

      <section className="section">

        <div className="container">

          <div className="form-card large-form">

            <form onSubmit={handleSubmit}>

              {/* Client Information */}

              <div className="form-section">

                <h2>Client Information</h2>

                <div className="form-row">

                  {/* Name */}

                  <div className="form-group">

                    <label htmlFor="name">
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* Email */}

                  <div className="form-group">

                    <label htmlFor="email">
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <div className="form-row">

                  {/* Phone */}

                  <div className="form-group">

                    <label htmlFor="phone">
                      Phone
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                  </div>


                  {/* Company */}

                  <div className="form-group">

                    <label htmlFor="company">
                      Company / Business
                    </label>

                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>


              {/* Project Details */}

              <div className="form-section">

                <h2>Project Details</h2>


                {/* Project Type */}

                <div className="form-group">

                  <label htmlFor="projectType">
                    Project Type
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select project type
                    </option>

                    <option value="Business Website">
                      Business Website
                    </option>

                    <option value="E-Commerce Website">
                      E-Commerce Website
                    </option>

                    <option value="Web Application">
                      Web Application
                    </option>

                    <option value="Portfolio Website">
                      Portfolio Website
                    </option>

                    <option value="Custom Project">
                      Custom Project
                    </option>

                  </select>

                </div>


                <div className="form-row">

                  {/* Budget */}

                  <div className="form-group">

                    <label htmlFor="budget">
                      Estimated Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select budget
                      </option>

                      <option value="₹5,000 - ₹10,000">
                        ₹5,000 - ₹10,000
                      </option>

                      <option value="₹10,000 - ₹25,000">
                        ₹10,000 - ₹25,000
                      </option>

                      <option value="₹25,000 - ₹50,000">
                        ₹25,000 - ₹50,000
                      </option>

                      <option value="₹50,000+">
                        ₹50,000+
                      </option>

                    </select>

                  </div>


                  {/* Timeline */}

                  <div className="form-group">

                    <label htmlFor="timeline">
                      Expected Timeline
                    </label>

                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select timeline
                      </option>

                      <option value="1-2 Weeks">
                        1-2 Weeks
                      </option>

                      <option value="2-4 Weeks">
                        2-4 Weeks
                      </option>

                      <option value="1-2 Months">
                        1-2 Months
                      </option>

                      <option value="Flexible">
                        Flexible
                      </option>

                    </select>

                  </div>

                </div>


                {/* Required Features */}

                <div className="form-group">

                  <label htmlFor="features">
                    Required Features
                  </label>

                  <textarea
                    id="features"
                    name="features"
                    rows="5"
                    placeholder="Example: Login, payment gateway, admin dashboard, product management..."
                    value={formData.features}
                    onChange={handleChange}
                  ></textarea>

                </div>


                {/* Project Description */}

                <div className="form-group">

                  <label htmlFor="description">
                    Project Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="7"
                    placeholder="Describe your website idea..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

              </div>


              {/* Submit Button */}

              <Button type="submit" fullWidth>
                Submit Project Request
              </Button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Quote;
