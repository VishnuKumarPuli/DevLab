import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-container">

        <div className="hero-content">

          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            PROFESSIONAL WEBSITE DEVELOPMENT
          </div>

          <h1>
            I Build Websites
            <span> That Help Businesses Grow.</span>
          </h1>

          <p className="hero-description">
            Modern, responsive and high-performing websites designed
            to help businesses build credibility, attract customers,
            and grow online.
          </p>

          <div className="hero-buttons">

            <Link to="/quote" className="btn btn-primary">
              Start Your Project
              <span className="btn-arrow">→</span>
            </Link>

            <Link to="/portfolio" className="btn btn-secondary">
              View My Work
              <span className="btn-arrow">↗</span>
            </Link>

          </div>

          <div className="hero-trust">
            <span>✓ Responsive Design</span>
            <span>✓ Fast Performance</span>
            <span>✓ Custom Development</span>
          </div>

          <div className="hero-stats">

            <div className="hero-stat">
              <h3>50<span>+</span></h3>
              <p>Projects</p>
            </div>

            <div className="hero-stat-divider"></div>

            <div className="hero-stat">
              <h3>30<span>+</span></h3>
              <p>Happy Clients</p>
            </div>

            <div className="hero-stat-divider"></div>

            <div className="hero-stat">
              <h3>2<span>+</span></h3>
              <p>Years Experience</p>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-visual-glow"></div>

          <div className="hero-code-window">

            <div className="code-window-header">

              <div className="code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="code-window-title">
                DevLab.jsx
              </span>

            </div>

            <div className="code-content">

              <div>
                <span className="code-number">01</span>
                <span className="code-purple">const</span>{" "}
                <span className="code-blue">website</span>{" "}
                = {"{"}
              </div>

              <div>
                <span className="code-number">02</span>
                <span className="code-indent">name:</span>{" "}
                <span className="code-green">
                  "Your Business"
                </span>
                ,
              </div>

              <div>
                <span className="code-number">03</span>
                <span className="code-indent">design:</span>{" "}
                <span className="code-green">
                  "Modern"
                </span>
                ,
              </div>

              <div>
                <span className="code-number">04</span>
                <span className="code-indent">responsive:</span>{" "}
                <span className="code-orange">
                  true
                </span>
                ,
              </div>

              <div>
                <span className="code-number">05</span>
                <span className="code-indent">performance:</span>{" "}
                <span className="code-green">
                  "Fast"
                </span>
              </div>

              <div>
                <span className="code-number">06</span>
                {"}"}
              </div>

            </div>

            <div className="code-status">
              <span className="status-dot"></span>
              Website Ready
            </div>

          </div>

          <div className="floating-card floating-card-one">
            <span className="floating-icon">⚡</span>
            <div>
              <strong>Fast</strong>
              <small>Performance</small>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span className="floating-icon">✓</span>
            <div>
              <strong>100%</strong>
              <small>Responsive</small>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}