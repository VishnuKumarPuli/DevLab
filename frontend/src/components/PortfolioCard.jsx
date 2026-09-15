
import { Link } from "react-router-dom";

export default function PortfolioCard({
  image,
  title,
  category,
  description,
  technologies = [],
}) {
  // Convert image path into a browser-friendly path
  const getImagePath = (image) => {
    if (!image || image.trim() === "") {
      return "";
    }

    const imagePath = image.trim();

    // Full online image URL
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    // Base64 image
    if (imagePath.startsWith("data:image")) {
      return imagePath;
    }

    // Image inside public folder
    if (imagePath.startsWith("/")) {
      return imagePath;
    }

    // images/example.jpg
    if (imagePath.startsWith("images/")) {
      return `/${imagePath}`;
    }

    // Just example.jpg
    return `/images/${imagePath}`;
  };

  const imagePath = getImagePath(image);

  return (
    <div className="portfolio-card">

      <div className="portfolio-image">

        {imagePath ? (
          <img
            src={imagePath}
            alt={title}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="portfolio-placeholder"
          style={{
            display: imagePath ? "none" : "flex",
          }}
        >
          Project Preview
        </div>

      </div>

      <div className="portfolio-content">

        <span className="portfolio-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="portfolio-tech">

          {Array.isArray(technologies) &&
            technologies.map((tech, index) => (
              <span key={index}>
                {tech}
              </span>
            ))}

        </div>

        <Link to="/contact" className="portfolio-link">
          View Project →
        </Link>

      </div>

    </div>
  );
}
