package com.devlab.model;

public class Lead {

    private int id;
    private String name;
    private String email;
    private String phone;
    private String service;
    private String budget;
    private String message;
    private String status;

    public Lead() {
    }

    public Lead(String name, String email, String phone,
                String service, String budget, String message) {

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.budget = budget;
        this.message = message;
    }

    public Lead(int id, String name, String email, String phone,
                String service, String budget,
                String message, String status) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.budget = budget;
        this.message = message;
        this.status = status;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}