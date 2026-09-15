
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-about">
          <Link to="/" className="logo">
            Dev<span>Lab</span>
          </Link>

          <p>
            We build modern, responsive and professional websites
            that help businesses grow online.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h3>Services</h3>

          <Link to="/services">Business Websites</Link>
          <Link to="/services">Landing Pages</Link>
          <Link to="/services">E-Commerce</Link>
          <Link to="/services">Web Applications</Link>
          <Link to="/services">Maintenance</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>Email: pulivishnug@gmail.com</p>
          <p>Phone: +91 9440034238</p>
          <p>Hyderabad, Telangana, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} DevLab. All rights reserved.
        </p>

        <div className="footer-admin">
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
