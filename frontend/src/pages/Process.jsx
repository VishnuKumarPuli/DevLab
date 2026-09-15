import Button from "../components/Button";

function Process() {
  const steps = [
    {
      number: "01",
      icon: "💬",
      title: "Requirement Discussion",
      description:
        "We discuss your business, website requirements, features and goals.",
    },
    {
      number: "02",
      icon: "🎨",
      title: "Design & Planning",
      description:
        "The website structure, pages and user interface are planned.",
    },
    {
      number: "03",
      icon: "💻",
      title: "Development",
      description:
        "The website is developed using modern frontend and backend technologies.",
    },
    {
      number: "04",
      icon: "🧪",
      title: "Testing",
      description:
        "The website is tested for functionality, responsiveness and performance.",
    },
    {
      number: "05",
      icon: "🚀",
      title: "Deployment",
      description:
        "The completed website is deployed and made available online.",
    },
    {
      number: "06",
      icon: "🔧",
      title: "Support",
      description:
        "Post-launch support and maintenance can be provided when required.",
    },
  ];

  return (
    <div className="page">

      <section className="page-header">
        <div className="container">

          <span className="section-subtitle">How It Works</span>

          <h1>Simple Development Process</h1>

          <p>
            From the first conversation to the final deployment.
          </p>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="process-grid">

            {steps.map((step) => (
              <div className="process-card" key={step.number}>

                <div className="process-number">
                  {step.number}
                </div>

                <div className="process-icon">
                  {step.icon}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">

          <h2>Ready to Start?</h2>

          <p>
            Share your website requirements and let's discuss your project.
          </p>

          <Button to="/quote">Start Your Project</Button>

        </div>
      </section>

    </div>
  );
}

export default Process;