import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
}) {
  const className = `
    btn
    btn-${variant}
    ${fullWidth ? "btn-full" : ""}
  `;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
