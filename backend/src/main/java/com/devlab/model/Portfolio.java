package com.devlab.model;

public class Portfolio {

    private int id;
    private String title;
    private String category;
    private String description;
    private String image;
    private String technologies;
    private String projectUrl;
    private String status;

    public Portfolio() {
    }

    public Portfolio(int id, String title, String category,
                     String description, String image,
                     String technologies, String projectUrl,
                     String status) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;
        this.technologies = technologies;
        this.projectUrl = projectUrl;
        this.status = status;
    }

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public String getProjectUrl() {
        return projectUrl;
    }

    public void setProjectUrl(String projectUrl) {
        this.projectUrl = projectUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}