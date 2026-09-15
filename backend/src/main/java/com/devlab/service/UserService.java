
package com.devlab.service;

import com.devlab.dao.UserDAO;
import com.devlab.model.User;

import java.util.List;

public class UserService {

    private UserDAO userDAO;

    public UserService() {

        userDAO = new UserDAO();

    }

    // ==========================================
    // Register User
    // ==========================================

    public boolean registerUser(User user) {

        // Check whether email already exists

        if (userDAO.emailExists(user.getEmail())) {

            return false;

        }

        return userDAO.registerUser(user);

    }

    // ==========================================
    // User Login
    // ==========================================

    public User login(String email, String password) {

        User user = userDAO.getUserByEmail(email);

        if (user == null) {

            return null;

        }

        // Check password

        if (user.getPassword().equals(password)) {

            return user;

        }

        return null;

    }

    // ==========================================
    // Get User By Email
    // ==========================================

    public User getUserByEmail(String email) {

        return userDAO.getUserByEmail(email);

    }

    // ==========================================
    // Get All Users
    // ==========================================

    public List<User> getAllUsers() {

        return userDAO.getAllUsers();

    }

}
