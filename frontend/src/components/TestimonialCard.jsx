export default function TestimonialCard({
  name,
  role,
  message,
  image,
  rating = 5,
}) {
  return (
    <div className="testimonial-card">

      <div className="testimonial-rating">
        {"★".repeat(rating)}
      </div>

      <p className="testimonial-message">
        "{message}"
      </p>

      <div className="testimonial-user">

        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="testimonial-avatar">
            {name?.charAt(0)}
          </div>
        )}

        <div>
          <h4>{name}</h4>
          <span>{role}</span>
        </div>

      </div>

    </div>
  );
}