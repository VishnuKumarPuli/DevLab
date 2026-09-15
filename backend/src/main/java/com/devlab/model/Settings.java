package com.devlab.model;

public class Settings {

    private int id;
    private String name;
    private String email;
    private String phone;
    private boolean notifications;

    public Settings() {
    }

    public Settings(int id, String name, String email,
                    String phone, boolean notifications) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.notifications = notifications;
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

    public boolean isNotifications() {
        return notifications;
    }

    public void setNotifications(boolean notifications) {
        this.notifications = notifications;
    }
}