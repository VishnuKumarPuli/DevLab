package com.devlab.service;

import com.devlab.dao.AuthDAO;
import com.devlab.model.Admin;

public class AuthService {

    private AuthDAO authDAO;

    public AuthService() {
        authDAO = new AuthDAO();
    }

    public Admin login(String email, String password) {
        return authDAO.login(email, password);
    }
}