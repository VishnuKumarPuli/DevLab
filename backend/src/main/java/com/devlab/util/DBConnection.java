package com.devlab.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {

    private static String URL;
    private static String USERNAME;
    private static String PASSWORD;

    static {

        try {

            // Load MySQL Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Check Render environment variables first
            String envUrl = System.getenv("DB_URL");
            String envUsername = System.getenv("DB_USERNAME");
            String envPassword = System.getenv("DB_PASSWORD");

            if (envUrl != null && !envUrl.isBlank()
                    && envUsername != null && !envUsername.isBlank()
                    && envPassword != null && !envPassword.isBlank()) {

                // Render / Production
                URL = envUrl;
                USERNAME = envUsername;
                PASSWORD = envPassword;

                System.out.println("Using database configuration from environment variables.");

            } else {

                // Local development
                Properties properties = new Properties();

                InputStream input = DBConnection.class
                        .getClassLoader()
                        .getResourceAsStream("db.properties");

                if (input == null) {
                    throw new RuntimeException("db.properties file not found");
                }

                properties.load(input);
                input.close();

                URL = properties.getProperty("db.url");
                USERNAME = properties.getProperty("db.username");
                PASSWORD = properties.getProperty("db.password");

                System.out.println("Using database configuration from db.properties.");
            }

        } catch (IOException | ClassNotFoundException e) {

            e.printStackTrace();
            throw new RuntimeException("Database configuration failed");

        }
    }

    public static Connection getConnection() throws SQLException {

        return DriverManager.getConnection(
                URL,
                USERNAME,
                PASSWORD
        );
    }
}