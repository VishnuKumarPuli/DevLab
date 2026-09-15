import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/hero.css";
import "./styles/button.css";
import "./styles/service-card.css";
import "./styles/portfolio-card.css";
import "./styles/pricing-card.css";
import "./styles/testimonial-card.css";
import "./styles/pages.css";
import "./styles/forms.css";
import "./styles/responsive.css";
import "./styles/admin.css";
import "./styles/admin-responsive.css";
import "./styles/admin-layout.css";
import "./styles/user-layout.css";
import "./styles/user-auth.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);