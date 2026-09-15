import ServiceCard from "../components/ServiceCard";
import Button from "../components/Button";

function Services() {
  const services = [
    {
      icon: "💻",
      title: "Business Website",
      description:
        "Professional websites for companies, startups, shops and personal businesses.",
      features: [
        "Responsive design",
        "Modern UI",
        "Contact forms",
        "SEO friendly",
      ],
    },
    {
      icon: "🛒",
      title: "E-Commerce Website",
      description:
        "Build an online store where customers can browse and purchase products.",
      features: [
        "Product management",
        "Shopping cart",
        "Order management",
        "Payment integration",
      ],
    },
    {
      icon: "⚡",
      title: "Web Application",
      description:
        "Custom web applications designed around your business workflow.",
      features: [
        "Custom features",
        "Authentication",
        "Database integration",
        "REST API",
      ],
    },
    {
      icon: "🎨",
      title: "UI Development",
      description:
        "Clean and responsive user interfaces for websites and applications.",
      features: [
        "Modern layouts",
        "Responsive design",
        "Reusable components",
        "Cross-browser support",
      ],
    },
    {
      icon: "🔧",
      title: "Website Maintenance",
      description:
        "Keep your existing website updated, secure and running smoothly.",
      features: [
        "Bug fixing",
        "Content updates",
        "Performance improvements",
        "Technical support",
      ],
    },
    {
      icon: "🚀",
      title: "Website Deployment",
      description:
        "Deploy your website and make it available to users online.",
      features: [
        "Production deployment",
        "Domain setup",
        "Hosting configuration",
        "Basic optimization",
      ],
    },
  ];

  return (
    <div className="page">

      <section className="page-header">
        <div className="container">
          <span className="section-subtitle">Services</span>

          <h1>Professional Website Development Services</h1>

          <p>
            Choose the service that matches your business requirements.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="cards-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">

          <h2>Don't See What You Need?</h2>

          <p>
            Tell me about your project and I can discuss a custom solution.
          </p>

          <Button to="/quote">Request a Quote</Button>

        </div>
      </section>

    </div>
  );
}

export default Services;