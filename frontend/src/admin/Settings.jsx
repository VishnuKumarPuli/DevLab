
import {
  useEffect,
  useState
} from "react";

import {
  getSettings,
  updateSettings
} from "../services/api";


function Settings() {

  const [settings, setSettings] =
    useState({
      name: "",
      email: "",
      phone: "",
      notifications: true,
    });


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  // =========================================
  // LOAD SETTINGS
  // =========================================

  const loadSettings = async () => {

    try {

      setLoading(true);

      const data =
        await getSettings();

      setSettings({

        name:
          data.name || "",

        email:
          data.email || "",

        phone:
          data.phone || "",

        notifications:
          data.notifications ?? true,

      });

    } catch (error) {

      console.error(
        "Failed to load settings:",
        error
      );

      alert(
        "Failed to load settings"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // LOAD WHEN PAGE OPENS
  // =========================================

  useEffect(() => {

    loadSettings();

  }, []);


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setSettings({
      ...settings,
      [name]: value,
    });

  };


  // =========================================
  // SAVE SETTINGS
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateSettings(settings);

      alert(
        "Settings saved successfully"
      );

    } catch (error) {

      console.error(
        "Failed to save settings:",
        error
      );

      alert(
        "Failed to save settings"
      );

    } finally {

      setSaving(false);

    }
  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="admin-page">

        <div className="admin-container">

          <div className="admin-empty-state">

            <p>
              Loading settings...
            </p>

          </div>

        </div>

      </div>
    );

  }


  // =========================================
  // MAIN UI
  // =========================================

  return (
    <div className="admin-page">

      <div className="admin-container">


        {/* PAGE HEADER */}

        <div className="admin-page-header">

          <div>

            <h1>
              Settings
            </h1>

            <p>
              Manage your DevLab admin settings.
            </p>

          </div>

        </div>


        {/* SETTINGS CARD */}

        <div className="admin-settings-card">

          <form
            onSubmit={handleSubmit}
          >


            {/* BUSINESS NAME */}

            <div className="admin-form-group">

              <label>
                Business Name
              </label>

              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="admin-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* PHONE */}

            <div className="admin-form-group">

              <label>
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />

            </div>


            {/* NOTIFICATIONS */}

            <div className="admin-checkbox">

              <input
                type="checkbox"
                checked={
                  settings.notifications
                }
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications:
                      e.target.checked,
                  })
                }
              />

              <label>
                Enable notifications
              </label>

            </div>


            {/* SAVE */}

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save Settings"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );

}


export default Settings;
