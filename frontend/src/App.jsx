import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// ==============================
// Public Components
// ==============================
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ==============================
// Public Pages
// ==============================
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";

// ==============================
// Admin Components
// ==============================
import AdminLayout from "./admin/AdminLayout";
import AdminRoute from "./admin/AdminRoute";

// ==============================
// Admin Pages
// ==============================
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Leads from "./admin/Leads";
import Projects from "./admin/Projects";
import Tasks from "./admin/Tasks";
import AdminServices from "./admin/Services";
import AdminPortfolio from "./admin/Portfolio";
import Payments from "./admin/Payments";
import Testimonials from "./admin/Testimonials";
import Messages from "./admin/Messages";
import Settings from "./admin/Settings";
import ClientMessages from "./admin/ClientMessages";
// ==============================
// User Pages
// ==============================
import UserLogin from "./users/UserLogin";
import UserRegister from "./users/UserRegister";
import UserRoute from "./users/UserRoute";
import UserDashboard from "./users/Dashboard";
import UserProjects from "./users/Projects";
import UserLayout from "./users/UserLayout";
import UserTasks from "./users/Tasks";
import UserPayments from "./users/Payments";
import UserNotifications from "./users/Notifications";
import UserMessages from "./users/Messages";
import Profile from "./users/Profile";
// ==========================================
// App Content
// ==========================================

function AppContent() {

  const location = useLocation();

  // Check whether current page is an admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  // Check whether current page is a user page
  const isUserPage = location.pathname.startsWith("/user");

  // Hide public Navbar and Footer
  // on Admin and User pages
  const hidePublicLayout = isAdminPage || isUserPage;

  return (
    <div className="app">

      {/* =====================================
          PUBLIC NAVBAR
          Hidden on Admin and User pages
      ====================================== */}
      {!hidePublicLayout && <Navbar />}


      {/* =====================================
          MAIN CONTENT
      ====================================== */}
      <main>

        <Routes>

          {/* =================================
              PUBLIC WEBSITE ROUTES
          ================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/portfolio"
            element={<Portfolio />}
          />

          <Route
            path="/pricing"
            element={<Pricing />}
          />

          <Route
            path="/process"
            element={<Process />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/quote"
            element={<Quote />}
          />


          {/* =================================
              ADMIN LOGIN
          ================================== */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />


          {/* =================================
              PROTECTED ADMIN PANEL
          ================================== */}

          <Route
            path="/admin"
            element={<AdminRoute />}
          >

            <Route
              element={<AdminLayout />}
            >

              {/* Dashboard */}
              <Route
                path="dashboard"
                element={<Dashboard />}
              />

              {/* Leads */}
              <Route
                path="leads"
                element={<Leads />}
              />

              {/* Projects */}
              <Route
                path="projects"
                element={<Projects />}
              />

              {/* Tasks */}
              <Route
                path="tasks"
                element={<Tasks />}
              />

              {/* Services */}
              <Route
                path="services"
                element={<AdminServices />}
              />

              {/* Portfolio */}
              <Route
                path="portfolio"
                element={<AdminPortfolio />}
              />

              {/* Payments */}
              <Route
                path="payments"
                element={<Payments />}
              />

              {/* Testimonials */}
              <Route
                path="testimonials"
                element={<Testimonials />}
              />

              {/* Messages */}
              <Route
                path="messages"
                element={<Messages />}
              />

              {/* Settings */}
              <Route
                path="settings"
                element={<Settings />}
              />

              <Route
        path="/admin/client-messages"
        element={<ClientMessages />}
    />

            </Route>

          </Route>


          {/* =================================
              USER AUTHENTICATION
          ================================== */}

          {/* User Login */}
          <Route
            path="/user/login"
            element={<UserLogin />}
          />

          {/* User Register */}
          <Route
            path="/user/register"
            element={<UserRegister />}
          />


          {/* =================================
              PROTECTED USER PANEL
          ================================== */}

        <Route path="/user" element={<UserRoute />}>
 <Route element={<UserLayout />}>

  <Route
    path="dashboard"
    element={<UserDashboard />}
  />

  <Route
    path="projects"
    element={<UserProjects />}
  />

  <Route
    path="tasks"
    element={<UserTasks />}
  />

  <Route
    path="payments"
    element={<UserPayments />}
  />

  <Route
    path="notifications"
    element={<UserNotifications />}
  />
  <Route path="/user/messages" element={<UserMessages />} />
  <Route
    path="profile"
    element={<Profile />}
/>
</Route>
</Route>


          {/* =================================
              404 PAGE
          ================================== */}

          <Route
            path="*"
            element={
              <div className="page">

                <div className="container">

                  <h1>404</h1>

                  <p>
                    Page not found.
                  </p>

                </div>

              </div>
            }
          />

        </Routes>

      </main>


      {/* =====================================
          PUBLIC FOOTER
          Hidden on Admin and User pages
      ====================================== */}
      {!hidePublicLayout && <Footer />}

    </div>
  );
}


// ==========================================
// Main App
// ==========================================

function App() {

  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;