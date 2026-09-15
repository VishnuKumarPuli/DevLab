package com.devlab.model;

import java.sql.Timestamp;

public class Notification {

    private int id;
    private String title;
    private String message;
    private String type;
    private Integer referenceId;
    private boolean read;
    private Timestamp createdAt;


    // =========================================
    // DEFAULT CONSTRUCTOR
    // =========================================

    public Notification() {
    }


    // =========================================
    // CONSTRUCTOR
    // =========================================

    public Notification(
            String title,
            String message,
            String type,
            Integer referenceId
    ) {

        this.title = title;
        this.message = message;
        this.type = type;
        this.referenceId = referenceId;
    }


    // =========================================
    // GETTERS AND SETTERS
    // =========================================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public Integer getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(Integer referenceId) {
        this.referenceId = referenceId;
    }


    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }


    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}