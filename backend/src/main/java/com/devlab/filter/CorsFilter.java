package com.devlab.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter("/*")
public class CorsFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest =
                (HttpServletRequest) request;

        HttpServletResponse httpResponse =
                (HttpServletResponse) response;

        // =========================================
        // ALLOW LOCAL + LIVE REACT FRONTEND
        // =========================================

        String origin = httpRequest.getHeader("Origin");

        if ("http://localhost:5173".equals(origin)
                || "https://devlab-93yk.onrender.com".equals(origin)) {

            httpResponse.setHeader(
                    "Access-Control-Allow-Origin",
                    origin
            );
        }

        // =========================================
        // ALLOW HTTP METHODS
        // =========================================

        httpResponse.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
        );

        // =========================================
        // ALLOW REQUEST HEADERS
        // =========================================

        httpResponse.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type, Authorization"
        );

        // =========================================
        // ALLOW CREDENTIALS
        // =========================================

        httpResponse.setHeader(
                "Access-Control-Allow-Credentials",
                "true"
        );

        // =========================================
        // HANDLE PREFLIGHT REQUEST
        // =========================================

        if ("OPTIONS".equalsIgnoreCase(
                httpRequest.getMethod())) {

            httpResponse.setStatus(
                    HttpServletResponse.SC_OK
            );

            return;
        }

        // =========================================
        // CONTINUE REQUEST
        // =========================================

        chain.doFilter(
                request,
                response
        );
    }
}