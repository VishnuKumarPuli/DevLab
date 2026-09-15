package com.devlab.model;

public class Payment {

    private int id;
    private String paymentId;
    private int projectId;
    private String projectName;
    private String client;
    private String type;
    private double amount;
    private String status;
    private String paymentDate;
    private String createdAt;


    public Payment() {
    }


    public Payment(
            String paymentId,
            int projectId,
            String client,
            String type,
            double amount,
            String status,
            String paymentDate) {

        this.paymentId = paymentId;
        this.projectId = projectId;
        this.client = client;
        this.type = type;
        this.amount = amount;
        this.status = status;
        this.paymentDate = paymentDate;
    }


    public Payment(
            int id,
            String paymentId,
            int projectId,
            String projectName,
            String client,
            String type,
            double amount,
            String status,
            String paymentDate,
            String createdAt) {

        this.id = id;
        this.paymentId = paymentId;
        this.projectId = projectId;
        this.projectName = projectName;
        this.client = client;
        this.type = type;
        this.amount = amount;
        this.status = status;
        this.paymentDate = paymentDate;
        this.createdAt = createdAt;
    }


    public int getId() {
        return id;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public int getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getClient() {
        return client;
    }

    public String getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public String getCreatedAt() {
        return createdAt;
    }


    public void setId(int id) {
        this.id = id;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }


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


    public String toJson() {

        return "{"
                + "\"id\":" + id + ","
                + "\"paymentId\":\"" + escapeJson(paymentId) + "\","
                + "\"projectId\":" + projectId + ","
                + "\"projectName\":\"" + escapeJson(projectName) + "\","
                + "\"client\":\"" + escapeJson(client) + "\","
                + "\"type\":\"" + escapeJson(type) + "\","
                + "\"amount\":" + amount + ","
                + "\"status\":\"" + escapeJson(status) + "\","
                + "\"paymentDate\":\"" + escapeJson(paymentDate) + "\","
                + "\"createdAt\":\"" + escapeJson(createdAt) + "\""
                + "}";
    }
}