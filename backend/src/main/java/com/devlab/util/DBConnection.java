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

            Properties properties = new Properties();

            InputStream input = DBConnection.class
                    .getClassLoader()
                    .getResourceAsStream("db.properties");

            if (input == null) {
                throw new RuntimeException("db.properties file not found");
            }

            properties.load(input);

            URL = properties.getProperty("db.url");
            USERNAME = properties.getProperty("db.username");
            PASSWORD = properties.getProperty("db.password");

            Class.forName("com.mysql.cj.jdbc.Driver");

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