import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Pricing", path: "/pricing" },
    { name: "Process", path: "/process" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Web<span>Craft</span>
        </Link>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <Link to="/quote" className="nav-cta">
          Get a Quote
        </Link>
      </div>
    </header>
  );
}