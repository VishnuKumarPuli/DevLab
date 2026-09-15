package com.devlab.controller;

import com.devlab.model.Project;
import com.devlab.service.ProjectService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/projects")
public class ProjectServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private ProjectService projectService;


    // =========================================================
    // INIT
    // =========================================================

    @Override
    public void init() throws ServletException {

        projectService = new ProjectService();

    }


    // =========================================================
    // GET
    // =========================================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String idParameter =
                request.getParameter("id");


        // GET PROJECT BY ID

        if (idParameter != null &&
            !idParameter.trim().isEmpty()) {

            try {

                int id =
                        Integer.parseInt(idParameter);

                Project project =
                        projectService.getProjectById(id);

                if (project != null) {

                    out.print(project.toJson());

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_NOT_FOUND
                    );

                    out.print(
                            "{\"success\":false,\"message\":\"Project not found.\"}"
                    );
                }

            } catch (NumberFormatException e) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Invalid project ID.\"}"
                );
            }

            return;
        }


        // GET ALL PROJECTS

        List<Project> projects =
                projectService.getAllProjects();

        StringBuilder json =
                new StringBuilder();

        json.append("[");

        for (int i = 0; i < projects.size(); i++) {

            json.append(
                    projects.get(i).toJson()
            );

            if (i < projects.size() - 1) {

                json.append(",");

            }
        }

        json.append("]");

        out.print(json.toString());
    }


    // =========================================================
    // POST
    // =========================================================

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();

        try {

            String name =
                    request.getParameter("name");

            String client =
                    request.getParameter("client");

            String status =
                    request.getParameter("status");

            String progressParameter =
                    request.getParameter("progress");

            String amount =
                    request.getParameter("amount");


            // VALIDATION

            if (name == null ||
                name.trim().isEmpty() ||
                client == null ||
                client.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Name and client are required.\"}"
                );

                return;
            }


            int progress = 0;

            if (progressParameter != null &&
                !progressParameter.trim().isEmpty()) {

                progress =
                        Integer.parseInt(progressParameter);
            }


            if (status == null ||
                status.trim().isEmpty()) {

                status = "Planning";
            }


            if (amount == null) {

                amount = "";
            }


            Project project =
                    new Project(
                            name,
                            client,
                            status,
                            progress,
                            amount
                    );


            boolean success =
                    projectService.addProject(project);


            if (success) {

                response.setStatus(
                        HttpServletResponse.SC_CREATED
                );

                out.print(
                        "{\"success\":true,\"message\":\"Project added successfully!\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to add project.\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Progress must be a number.\"}"
            );

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                    "{\"success\":false,\"message\":\"Server error while adding project.\"}"
            );
        }
    }


    // =========================================================
    // PUT
    // =========================================================

    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();


        String idParameter =
                request.getParameter("id");


        if (idParameter == null ||
            idParameter.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Project ID is required.\"}"
            );

            return;
        }


        try {

            int id =
                    Integer.parseInt(idParameter);


            String name =
                    request.getParameter("name");

            String client =
                    request.getParameter("client");

            String status =
                    request.getParameter("status");

            String progressParameter =
                    request.getParameter("progress");

            String amount =
                    request.getParameter("amount");


            if (name == null ||
                name.trim().isEmpty() ||
                client == null ||
                client.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Name and client are required.\"}"
                );

                return;
            }


            int progress = 0;

            if (progressParameter != null &&
                !progressParameter.trim().isEmpty()) {

                progress =
                        Integer.parseInt(progressParameter);
            }


            if (status == null ||
                status.trim().isEmpty()) {

                status = "Planning";
            }


            if (amount == null) {

                amount = "";
            }


            Project project =
                    new Project(
                            id,
                            name,
                            client,
                            status,
                            progress,
                            amount
                    );


            boolean success =
                    projectService.updateProject(project);


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Project updated successfully!\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                out.print(
                        "{\"success\":false,\"message\":\"Project not found or could not be updated.\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid project ID or progress value.\"}"
            );

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                    "{\"success\":false,\"message\":\"Server error while updating project.\"}"
            );
        }
    }


    // =========================================================
    // DELETE
    // =========================================================

    @Override
    protected void doDelete(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out =
                response.getWriter();


        String idParameter =
                request.getParameter("id");


        if (idParameter == null ||
            idParameter.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Project ID is required.\"}"
            );

            return;
        }


        try {

            int id =
                    Integer.parseInt(idParameter);


            boolean success =
                    projectService.deleteProject(id);


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Project deleted successfully!\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_NOT_FOUND
                );

                out.print(
                        "{\"success\":false,\"message\":\"Project not found.\"}"
                );
            }

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid project ID.\"}"
            );

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            out.print(
                    "{\"success\":false,\"message\":\"Server error while deleting project.\"}"
            );
        }
    }
}