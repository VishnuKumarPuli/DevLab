package com.devlab.controller;

import com.devlab.model.Task;
import com.devlab.service.TaskService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/tasks")
public class TaskServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private TaskService taskService;


    @Override
    public void init() throws ServletException {

        taskService =
                new TaskService();
    }


    // =========================================================
    // GET
    // =========================================================

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {


        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        PrintWriter out =
                response.getWriter();


        String idParam =
                request.getParameter("id");


        // GET BY ID

        if (idParam != null &&
                !idParam.isEmpty()) {

            try {

                int id =
                        Integer.parseInt(idParam);


                Task task =
                        taskService.getTaskById(id);


                if (task != null) {

                    out.print(
                            task.toJson()
                    );

                } else {

                    response.setStatus(
                            HttpServletResponse.SC_NOT_FOUND
                    );

                    out.print(
                            "{\"success\":false,\"message\":\"Task not found.\"}"
                    );
                }


            } catch (NumberFormatException e) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Invalid task ID.\"}"
                );
            }


            return;
        }


        // GET ALL

        List<Task> tasks =
                taskService.getAllTasks();


        StringBuilder json =
                new StringBuilder("[");


        for (int i = 0;
             i < tasks.size();
             i++) {

            json.append(
                    tasks.get(i).toJson()
            );


            if (i < tasks.size() - 1) {

                json.append(",");
            }
        }


        json.append("]");


        out.print(
                json.toString()
        );
    }


    // =========================================================
    // POST
    // =========================================================

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {


        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        PrintWriter out =
                response.getWriter();


        try {

            int projectId =
                    Integer.parseInt(
                            request.getParameter(
                                    "projectId"
                            )
                    );


            String title =
                    request.getParameter(
                            "title"
                    );

            String description =
                    request.getParameter(
                            "description"
                    );

            String assignedTo =
                    request.getParameter(
                            "assignedTo"
                    );

            String status =
                    request.getParameter(
                            "status"
                    );

            String priority =
                    request.getParameter(
                            "priority"
                    );

            String dueDate =
                    request.getParameter(
                            "dueDate"
                    );


            Task task =
                    new Task(
                            projectId,
                            title,
                            description,
                            assignedTo,
                            status,
                            priority,
                            dueDate
                    );


            boolean success =
                    taskService.addTask(task);


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Task added successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to add task.\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid task data.\"}"
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


        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        PrintWriter out =
                response.getWriter();


        try {

            int id =
                    Integer.parseInt(
                            request.getParameter("id")
                    );

            int projectId =
                    Integer.parseInt(
                            request.getParameter(
                                    "projectId"
                            )
                    );


            String title =
                    request.getParameter(
                            "title"
                    );

            String description =
                    request.getParameter(
                            "description"
                    );

            String assignedTo =
                    request.getParameter(
                            "assignedTo"
                    );

            String status =
                    request.getParameter(
                            "status"
                    );

            String priority =
                    request.getParameter(
                            "priority"
                    );

            String dueDate =
                    request.getParameter(
                            "dueDate"
                    );


            Task task =
                    new Task(
                            projectId,
                            title,
                            description,
                            assignedTo,
                            status,
                            priority,
                            dueDate
                    );


            task.setId(id);


            boolean success =
                    taskService.updateTask(task);


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Task updated successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to update task.\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid task data.\"}"
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


        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );


        PrintWriter out =
                response.getWriter();


        try {

            int id =
                    Integer.parseInt(
                            request.getParameter("id")
                    );


            boolean success =
                    taskService.deleteTask(id);


            if (success) {

                out.print(
                        "{\"success\":true,\"message\":\"Task deleted successfully.\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                out.print(
                        "{\"success\":false,\"message\":\"Unable to delete task.\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            out.print(
                    "{\"success\":false,\"message\":\"Invalid task ID.\"}"
            );
        }
    }
}