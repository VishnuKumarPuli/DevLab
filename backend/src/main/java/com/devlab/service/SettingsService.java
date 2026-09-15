
package com.devlab.service;

import com.devlab.dao.SettingsDAO;
import com.devlab.model.Settings;

public class SettingsService {

    private SettingsDAO settingsDAO;

    public SettingsService() {
        settingsDAO = new SettingsDAO();
    }

    // Get settings
    public Settings getSettings() {
        return settingsDAO.getSettings();
    }

    // Update settings
    public boolean updateSettings(Settings settings) {
        return settingsDAO.updateSettings(settings);
    }
}
