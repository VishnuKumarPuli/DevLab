import { Link } from "react-router-dom";

export default function PricingCard({
  name,
  price,
  description,
  features = [],
  popular = false,
}) {
  return (
    <div className={`pricing-card ${popular ? "popular" : ""}`}>

      {popular && (
        <div className="popular-badge">
          Most Popular
        </div>
      )}

      <h3>{name}</h3>

      <p className="pricing-description">
        {description}
      </p>

      <div className="price">
        <span>₹</span>
        {price}
      </div>

      <p className="price-note">
        Starting from
      </p>

      <ul className="pricing-features">

        {features.map((feature, index) => (
          <li key={index}>
            <span>✓</span>
            {feature}
          </li>
        ))}

      </ul>

      <Link to="/quote" className="pricing-button">
        Choose Plan
      </Link>

    </div>
  );
}