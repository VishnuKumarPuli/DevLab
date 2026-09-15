import PricingCard from "../components/PricingCard";

function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "₹5,000",
      description: "Perfect for individuals and small businesses.",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Contact form",
        "Basic SEO",
        "Social media links",
        "Deployment support",
      ],
    },
    {
      name: "Professional",
      price: "₹10,000",
      description: "Best for growing businesses and startups.",
      popular: true,
      features: [
        "Up to 10 pages",
        "Modern responsive design",
        "Contact forms",
        "Database integration",
        "REST API integration",
        "SEO optimization",
        "Deployment",
        "Basic maintenance",
      ],
    },
    {
      name: "Custom",
      price: "Let's Talk",
      description: "For advanced websites and custom applications.",
      features: [
        "Custom number of pages",
        "Custom functionality",
        "Database integration",
        "Authentication",
        "REST APIs",
        "Admin dashboard",
        "Payment integration",
        "Deployment",
      ],
    },
  ];

  return (
    <div className="page">

      <section className="page-header">
        <div className="container">

          <span className="section-subtitle">Pricing</span>

          <h1>Simple & Transparent Pricing</h1>

          <p>
            Choose a package or contact me for a custom project.
          </p>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default Pricing;