
import { useEffect, useState } from "react";
import PortfolioCard from "../components/PortfolioCard";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(
          "https://devlab-backend-4d8f.onrender.com/Backend/api/portfolio"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio projects");
        }

        const data = await response.json();

        console.log("Portfolio API Data:", data);

        const activeProjects = data.filter(
          (project) =>
            String(project.status || "").toLowerCase() === "active"
        );

        const formattedProjects = activeProjects.map((project) => {
          let image = project.image;

          /*
           * Convert database image value
           * into React public-folder path.
           */

          if (image) {
            image = String(image).trim();

            // If only filename is stored
            // example: business.jpg
            if (
              !image.startsWith("http://") &&
              !image.startsWith("https://") &&
              !image.startsWith("/") &&
              !image.startsWith("data:")
            ) {
              image = `/images/${image}`;
            }
          }

          return {
            ...project,
            image,

            technologies: Array.isArray(project.technologies)
              ? project.technologies
              : String(project.technologies || "")
                  .split(",")
                  .map((tech) => tech.trim())
                  .filter(Boolean),
          };
        });

        console.log("Formatted Portfolio Data:", formattedProjects);

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error loading portfolio:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="page">

      <section className="page-header">

        <div className="container">

          <span className="section-subtitle">
            Portfolio
          </span>

          <h1>
            Featured Projects
          </h1>

          <p>
            Explore modern websites and applications designed
            and developed by DevLab.
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container">

          {loading ? (
            <div className="portfolio-empty">
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="portfolio-empty">
              <p>
                No portfolio projects available at the moment.
              </p>
            </div>
          ) : (
            <div className="portfolio-grid">

              {projects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  {...project}
                />
              ))}

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default Portfolio;
