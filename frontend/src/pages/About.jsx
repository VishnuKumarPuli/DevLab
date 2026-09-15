import Button from "../components/Button";

function About() {
  return (
    <div className="page">

      {/* Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-subtitle">About DevLab</span>

          <h1>Building Websites That Help Businesses Grow</h1>

          <p>
            DevLab is a professional website development service focused on
            creating modern, responsive and user-friendly websites.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container two-column">

          <div>
            <span className="section-subtitle">Who I Am</span>

            <h2>Your Website Development Partner</h2>

            <p>
              I help businesses, startups and individuals create a strong
              online presence through modern website development.
            </p>

            <p>
              From simple business websites to custom web applications,
              every project is developed according to the client's
              requirements.
            </p>

            <Button to="/contact">Let's Work Together</Button>
          </div>

          <div className="about-card">
            <div className="about-icon">🚀</div>

            <h3>My Mission</h3>

            <p>
              To build high-quality websites that are fast, responsive,
              easy to use and valuable for businesses.
            </p>
          </div>

        </div>
      </section>

      {/* Skills */}
      <section className="section light-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-subtitle">Technologies</span>
            <h2>Technologies I Use</h2>
          </div>

          <div className="skills-grid">

            <div className="skill-card">
              <span>⚛️</span>
              <h3>React</h3>
              <p>Modern frontend development</p>
            </div>

            <div className="skill-card">
              <span>☕</span>
              <h3>Java</h3>
              <p>Backend application development</p>
            </div>

            <div className="skill-card">
              <span>🗄️</span>
              <h3>MySQL</h3>
              <p>Database management</p>
            </div>

            <div className="skill-card">
              <span>🌐</span>
              <h3>REST API</h3>
              <p>Frontend and backend communication</p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default About;