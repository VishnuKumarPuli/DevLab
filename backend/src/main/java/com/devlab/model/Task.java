package com.devlab.model;

public class Task {

    private int id;
    private int projectId;
    private String projectName;
    private String title;
    private String description;
    private String assignedTo;
    private String status;
    private String priority;
    private String dueDate;
    private String createdAt;


    public Task() {
    }


    public Task(
            int projectId,
            String title,
            String description,
            String assignedTo,
            String status,
            String priority,
            String dueDate) {

        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
    }


    public Task(
            int id,
            int projectId,
            String projectName,
            String title,
            String description,
            String assignedTo,
            String status,
            String priority,
            String dueDate,
            String createdAt) {

        this.id = id;
        this.projectId = projectId;
        this.projectName = projectName;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
    }


    public int getId() {
        return id;
    }

    public int getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public String getStatus() {
        return status;
    }

    public String getPriority() {
        return priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    public String getCreatedAt() {
        return createdAt;
    }


    public void setId(int id) {
        this.id = id;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
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
                + "\"projectId\":" + projectId + ","
                + "\"projectName\":\"" + escapeJson(projectName) + "\","
                + "\"title\":\"" + escapeJson(title) + "\","
                + "\"description\":\"" + escapeJson(description) + "\","
                + "\"assignedTo\":\"" + escapeJson(assignedTo) + "\","
                + "\"status\":\"" + escapeJson(status) + "\","
                + "\"priority\":\"" + escapeJson(priority) + "\","
                + "\"dueDate\":\"" + escapeJson(dueDate) + "\","
                + "\"createdAt\":\"" + escapeJson(createdAt) + "\""
                + "}";
    }
}