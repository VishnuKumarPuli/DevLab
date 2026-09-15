package com.devlab.model;

public class UserProject {

    private int id;
    private String name;
    private String client;
    private String status;
    private int progress;
    private String amount;
    private String createdAt;

    public UserProject() {
    }

    public UserProject(
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

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}