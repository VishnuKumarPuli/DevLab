
package com.devlab.dao;

import com.devlab.model.Settings;
import com.devlab.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class SettingsDAO {

    // Get settings
    public Settings getSettings() {

        Settings settings = null;

        String sql = "SELECT * FROM settings WHERE id = 1";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery()
        ) {

            if (resultSet.next()) {

                settings = new Settings();

                settings.setId(resultSet.getInt("id"));
                settings.setName(resultSet.getString("name"));
                settings.setEmail(resultSet.getString("email"));
                settings.setPhone(resultSet.getString("phone"));
                settings.setNotifications(
                    resultSet.getBoolean("notifications")
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

        }

        return settings;
    }


    // Update settings
    public boolean updateSettings(Settings settings) {

        String sql =
            "UPDATE settings SET name = ?, email = ?, phone = ?, notifications = ? WHERE id = 1";

        try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement =
                connection.prepareStatement(sql)
        ) {

            statement.setString(1, settings.getName());
            statement.setString(2, settings.getEmail());
            statement.setString(3, settings.getPhone());
            statement.setBoolean(4, settings.isNotifications());

            int rows = statement.executeUpdate();

            return rows > 0;

        } catch (Exception e) {

            e.printStackTrace();

        }

        return false;
    }
}
