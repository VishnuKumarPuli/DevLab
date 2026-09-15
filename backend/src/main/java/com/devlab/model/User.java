package com.devlab.model;

public class User {

    private int id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String company;
    private String createdAt;

    // Default constructor
    public User() {
    }

    // Constructor without id
    public User(
            String name,
            String email,
            String password,
            String phone,
            String company) {

        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.company = company;
    }

    // Constructor with all fields
    public User(
            int id,
            String name,
            String email,
            String password,
            String phone,
            String company,
            String createdAt) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.company = company;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}