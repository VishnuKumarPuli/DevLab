package com.devlab.model;

public class Testimonial {

    private int id;
    private String name;
    private String role;
    private String message;
    private int rating;
    private String status;
    private String createdAt;
    private String updatedAt;


    // Default constructor
    public Testimonial() {
    }


    // Constructor without id and timestamps
    public Testimonial(
            String name,
            String role,
            String message,
            int rating,
            String status) {

        this.name = name;
        this.role = role;
        this.message = message;
        this.rating = rating;
        this.status = status;
    }


    // Full constructor
    public Testimonial(
            int id,
            String name,
            String role,
            String message,
            int rating,
            String status,
            String createdAt,
            String updatedAt) {

        this.id = id;
        this.name = name;
        this.role = role;
        this.message = message;
        this.rating = rating;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    // Getters and Setters

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


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }


    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }


    // =========================================================
    // TO JSON
    // =========================================================

    public String toJson() {

        return "{"
                + "\"id\":" + id + ","
                + "\"name\":\"" + escapeJson(name) + "\","
                + "\"role\":\"" + escapeJson(role) + "\","
                + "\"message\":\"" + escapeJson(message) + "\","
                + "\"rating\":" + rating + ","
                + "\"status\":\"" + escapeJson(status) + "\","
                + "\"createdAt\":\"" + escapeJson(createdAt) + "\","
                + "\"updatedAt\":\"" + escapeJson(updatedAt) + "\""
                + "}";
    }


    // Escape special characters for JSON
    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}