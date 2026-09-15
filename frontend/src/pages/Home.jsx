import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import PortfolioCard from "../components/PortfolioCard";
import TestimonialCard from "../components/TestimonialCard";
import Button from "../components/Button";

function Home() {
  const services = [
    {
      icon: "💻",
      title: "Business Websites",
      description:
        "Professional websites designed to establish your business online.",
      features: [
        "Responsive design",
        "Modern UI",
        "SEO friendly",
        "Fast performance",
      ],
    },
    {
      icon: "🛒",
      title: "E-Commerce",
      description:
        "Complete online stores that help you sell products and grow your business.",
      features: [
        "Product management",
        "Shopping cart",
        "Order management",
        "Payment integration",
      ],
    },
    {
      icon: "⚡",
      title: "Web Applications",
      description:
        "Custom web applications built according to your business requirements.",
      features: [
        "Custom functionality",
        "Database integration",
        "User authentication",
        "REST APIs",
      ],
    },
  ];

  const projects = [
    {
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      title: "E-Commerce Website",
      category: "E-Commerce",
      description:
        "Modern online store with product management, shopping cart and order management.",
      technologies: ["React", "Java", "MySQL"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      title: "Restaurant Ordering System",
      category: "Restaurant",
      description:
        "Digital restaurant platform for showcasing menus and managing online orders.",
      technologies: ["React", "Java", "MySQL"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      title: "Real Estate Platform",
      category: "Real Estate",
      description:
        "Property listing platform designed to help customers discover and enquire about properties.",
      technologies: ["React", "Java", "MySQL"],
    },
  ];

  const testimonials = [
    {
      name: "Rahul",
      role: "Business Owner",
      message:
        "The website looks professional and works perfectly on mobile and desktop.",
      rating: 5,
    },
    {
      name: "Priya",
      role: "Startup Founder",
      message:
        "Great communication and a clean modern website. Highly recommended.",
      rating: 5,
    },
    {
      name: "Arjun",
      role: "Small Business Owner",
      message:
        "Our online presence improved significantly after launching the new website.",
      rating: 5,
    },
  ];

  return (
    <>
      <Hero />

      {/* Services */}
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <span className="section-subtitle">What I Do</span>
            <h2>Website Development Services</h2>
            <p>
              I build modern, responsive and business-focused websites
              according to your requirements.
            </p>
          </div>

          <div className="cards-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="section-action">
            <Button to="/services">View All Services</Button>
          </div>

        </div>
      </section>

      {/* Portfolio */}
      <section className="section portfolio-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-subtitle">My Work</span>
            <h2>Featured Projects</h2>
            <p>
              A few examples of websites and applications I have worked on.
            </p>
          </div>

          <div className="cards-grid">
            {projects.map((project, index) => (
              <PortfolioCard key={index} {...project} />
            ))}
          </div>

          <div className="section-action">
            <Button to="/portfolio">View Portfolio</Button>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <span className="section-subtitle">Testimonials</span>
            <h2>What Clients Say</h2>
            <p>
              Building websites is not just about design. It's about
              creating something useful for the client.
            </p>
          </div>

          <div className="cards-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2>Have a Website Idea?</h2>
          <p>
            Tell me what you need and let's turn your idea into a professional
            website.
          </p>

          <Button to="/quote" variant="primary">
            Start Your Project
          </Button>
        </div>
      </section>
    </>
  );
}

export default Home;