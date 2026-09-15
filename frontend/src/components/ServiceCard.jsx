
import { Link } from "react-router-dom";

export default function ServiceCard({
  icon = "💻",
  title,
  description,
  features = [],
}) {
  return (
    <div className="service-card">

      {/* Icon */}
      <div className="service-icon-wrapper">
        <div className="service-icon">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="service-content">

        <h3>{title}</h3>

        <p className="service-description">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <ul className="service-features">
            {features.map((feature, index) => (
              <li key={index}>
                <span className="feature-check">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <Link to="/quote" className="service-link">
          <span>Get Started</span>
          <span className="service-arrow">→</span>
        </Link>

      </div>

    </div>
  );
}