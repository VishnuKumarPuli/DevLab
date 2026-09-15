package com.devlab.model;

public class Project {

    private int id;
    private String name;
    private String client;
    private String status;
    private int progress;
    private String amount;
    private String createdAt;


    // =========================================
    // Default Constructor
    // =========================================

    public Project() {
    }


    // =========================================
    // Constructor for creating a new project
    // =========================================

    public Project(
            String name,
            String client,
            String status,
            int progress,
            String amount) {

        this.name = name;
        this.client = client;
        this.status = status;
        this.progress = progress;
        this.amount = amount;
    }


    // =========================================
    // Constructor with ID
    // =========================================

    public Project(
            int id,
            String name,
            String client,
            String status,
            int progress,
            String amount) {

        this.id = id;
        this.name = name;
        this.client = client;
        this.status = status;
        this.progress = progress;
        this.amount = amount;
    }


    // =========================================
    // Constructor with all fields
    // =========================================

    public Project(
            int id,
            String name,
            String client,
            String status,
            int progress,
            String amount,
            String createdAt) {

        this.id = id;
        this.name = name;
        this.client = client;
        this.status = status;
        this.progress = progress;
        this.amount = amount;
        this.createdAt = createdAt;
    }


    // =========================================
    // Getters
    // =========================================

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getClient() {
        return client;
    }

    public String getStatus() {
        return status;
    }

    public int getProgress() {
        return progress;
    }

    public String getAmount() {
        return amount;
    }

    public String getCreatedAt() {
        return createdAt;
    }


    // =========================================
    // Setters
    // =========================================

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }


    // =========================================
    // JSON-friendly method
    // =========================================

    public String toJson() {

        return "{"
                + "\"id\":" + id + ","
                + "\"name\":\"" + escapeJson(name) + "\","
                + "\"client\":\"" + escapeJson(client) + "\","
                + "\"status\":\"" + escapeJson(status) + "\","
                + "\"progress\":" + progress + ","
                + "\"amount\":\"" + escapeJson(amount) + "\","
                + "\"createdAt\":\"" + escapeJson(createdAt) + "\""
                + "}";
    }


    // =========================================
    // JSON Escape
    // =========================================

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


    // =========================================
    // toString()
    // =========================================

    @Override
    public String toString() {

        return "Project{"
                + "id=" + id
                + ", name='" + name + '\''
                + ", client='" + client + '\''
                + ", status='" + status + '\''
                + ", progress=" + progress
                + ", amount='" + amount + '\''
                + ", createdAt='" + createdAt + '\''
                + '}';
    }
}