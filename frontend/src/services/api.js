
// =========================================================
// DEVLAB API SERVICE
// =========================================================

// =========================================================
// BASE URL
// =========================================================

const BASE_URL =
    "https://devlab-backend-4d8f.onrender.com/Backend";


// =========================================================
// API URLS
// =========================================================

const API_URL =
    `${BASE_URL}/api/leads`;

const PROJECT_API_URL =
    `${BASE_URL}/api/projects`;

const TASK_API_URL =
    `${BASE_URL}/api/tasks`;

const PAYMENT_API_URL =
    `${BASE_URL}/api/payments`;

const SERVICE_API_URL =
    `${BASE_URL}/api/services`;

const TESTIMONIAL_API_URL =
    `${BASE_URL}/api/testimonials`;

const PORTFOLIO_API =
    `${BASE_URL}/api/portfolio`;

const MESSAGES_API =
    `${BASE_URL}/api/messages`;

const USER_NOTIFICATIONS_API =
    `${BASE_URL}/api/user/notifications`;

const USER_PROFILE_API =
    `${BASE_URL}/api/user/profile`;

const USERS_API =
    `${BASE_URL}/api/users`;

const CLIENT_MESSAGES_API =
    `${BASE_URL}/api/client-messages`;

const SETTINGS_API =
    `${BASE_URL}/api/settings`;

const DASHBOARD_API =
    `${BASE_URL}/api/dashboard`;


// =========================================================
// REUSABLE API RESPONSE HANDLER
// =========================================================

const handleResponse = async (response) => {

    if (!response.ok) {

        let errorMessage =
            `Request failed with status ${response.status}`;

        try {

            const errorData =
                await response.json();

            if (errorData.message) {
                errorMessage = errorData.message;
            }

        } catch (error) {

            // Response was not JSON

        }

        throw new Error(errorMessage);
    }

    return await response.json();
};


// =========================================================
// PROJECT API
// =========================================================

// Get all projects
export const getAllProjects = async () => {

    const response =
        await fetch(PROJECT_API_URL, {
            method: "GET",
            credentials: "include",
        });

    return await handleResponse(response);
};


// Get project by ID
export const getProjectById = async (id) => {

    const response =
        await fetch(
            `${PROJECT_API_URL}?id=${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Create project
export const createProject = async (projectData) => {

    const response =
        await fetch(
            PROJECT_API_URL,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams(
                        projectData
                    ),
            }
        );

    return await handleResponse(response);
};


// Update project
export const updateProject = async (
    id,
    projectData
) => {

    const params =
        new URLSearchParams({

            id: id,

            name:
                projectData.name,

            client:
                projectData.client,

            status:
                projectData.status,

            progress:
                projectData.progress,

            amount:
                projectData.amount,
        });


    const response =
        await fetch(
            `${PROJECT_API_URL}?${params.toString()}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Delete project
export const deleteProject = async (id) => {

    const response =
        await fetch(
            `${PROJECT_API_URL}?id=${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// =========================================================
// LEAD API
// =========================================================

// Create a new lead
export const createLead = async (leadData) => {

    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams(
                        leadData
                    ),
            }
        );


    return await handleResponse(response);
};


// Get all leads
export const getAllLeads = async () => {

    const response =
        await fetch(
            API_URL,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Get lead by ID
export const getLeadById = async (id) => {

    const response =
        await fetch(
            `${API_URL}?id=${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Update lead status
export const updateLeadStatus = async (
    id,
    status
) => {

    const response =
        await fetch(
            `${API_URL}?id=${id}&status=${encodeURIComponent(status)}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Delete lead
export const deleteLead = async (id) => {

    const response =
        await fetch(
            `${API_URL}?id=${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// =========================================================
// TASK API
// =========================================================

// Get all tasks
export const getAllTasks = async () => {

    const response =
        await fetch(
            TASK_API_URL,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Get task by ID
export const getTaskById = async (id) => {

    const response =
        await fetch(
            `${TASK_API_URL}?id=${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Create task
export const createTask = async (taskData) => {

    const response =
        await fetch(
            TASK_API_URL,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams(
                        taskData
                    ),
            }
        );


    return await handleResponse(response);
};


// Update task
export const updateTask = async (
    id,
    taskData
) => {

    const params =
        new URLSearchParams({

            id: id,

            projectId:
                taskData.projectId,

            title:
                taskData.title,

            description:
                taskData.description,

            assignedTo:
                taskData.assignedTo,

            status:
                taskData.status,

            priority:
                taskData.priority,

            dueDate:
                taskData.dueDate,
        });


    const response =
        await fetch(
            `${TASK_API_URL}?${params.toString()}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Delete task
export const deleteTask = async (id) => {

    const response =
        await fetch(
            `${TASK_API_URL}?id=${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// =========================================================
// PAYMENT API
// =========================================================

// Get all payments
export const getAllPayments = async () => {

    const response =
        await fetch(
            PAYMENT_API_URL,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Get payment by ID
export const getPaymentById = async (id) => {

    const response =
        await fetch(
            `${PAYMENT_API_URL}?id=${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Create payment
export const createPayment = async (
    paymentData
) => {

    const response =
        await fetch(
            PAYMENT_API_URL,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams(
                        paymentData
                    ),
            }
        );


    return await handleResponse(response);
};


// Update payment
export const updatePayment = async (
    id,
    paymentData
) => {

    const params =
        new URLSearchParams({

            id: id,

            paymentId:
                paymentData.paymentId,

            projectId:
                paymentData.projectId,

            client:
                paymentData.client,

            type:
                paymentData.type,

            amount:
                paymentData.amount,

            status:
                paymentData.status,

            paymentDate:
                paymentData.paymentDate || "",
        });


    const response =
        await fetch(
            `${PAYMENT_API_URL}?${params.toString()}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Delete payment
export const deletePayment = async (id) => {

    const response =
        await fetch(
            `${PAYMENT_API_URL}?id=${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// =========================================================
// SERVICE API
// =========================================================

// Get all services
export const getAllServices = async () => {

    const response =
        await fetch(
            SERVICE_API_URL,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Get service by ID
export const getServiceById = async (id) => {

    const response =
        await fetch(
            `${SERVICE_API_URL}?id=${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Add service
export const createService = async (
    serviceData
) => {

    const response =
        await fetch(
            SERVICE_API_URL,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams(
                        serviceData
                    ),
            }
        );


    return await handleResponse(response);
};


// Update service
export const updateService = async (
    id,
    serviceData
) => {

    const params =
        new URLSearchParams({

            id: id,

            name:
                serviceData.name,

            price:
                serviceData.price,

            active:
                serviceData.active,
        });


    const response =
        await fetch(
            `${SERVICE_API_URL}?${params.toString()}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Delete service
export const deleteService = async (id) => {

    const response =
        await fetch(
            `${SERVICE_API_URL}?id=${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// =========================================================
// TESTIMONIAL API
// =========================================================

// Get all testimonials
export const getAllTestimonials = async () => {

    const response =
        await fetch(
            TESTIMONIAL_API_URL,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Get testimonial by ID
export const getTestimonialById = async (id) => {

    const response =
        await fetch(
            `${TESTIMONIAL_API_URL}?id=${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Add testimonial
export const createTestimonial = async (
    testimonialData
) => {

    const response =
        await fetch(
            TESTIMONIAL_API_URL,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body:
                    new URLSearchParams(
                        testimonialData
                    ),
            }
        );


    return await handleResponse(response);
};


// Update testimonial
export const updateTestimonial = async (
    id,
    testimonialData
) => {

    const params =
        new URLSearchParams({

            id: id,

            name:
                testimonialData.name,

            role:
                testimonialData.role,

            message:
                testimonialData.message,

            rating:
                testimonialData.rating,

            status:
                testimonialData.status,
        });


    const response =
        await fetch(
            `${TESTIMONIAL_API_URL}?${params.toString()}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Enable / Disable testimonial
export const updateTestimonialStatus = async (
    id,
    status
) => {

    const params =
        new URLSearchParams({

            id: id,

            action: "status",

            status: status,
        });


    const response =
        await fetch(
            `${TESTIMONIAL_API_URL}?${params.toString()}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// Delete testimonial
export const deleteTestimonial = async (id) => {

    const response =
        await fetch(
            `${TESTIMONIAL_API_URL}?id=${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );


    return await handleResponse(response);
};


// =========================================================
// PORTFOLIO API
// =========================================================

// Get all portfolio projects
export const getAllPortfolios = async () => {

    const response =
        await fetch(
            PORTFOLIO_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to load portfolio projects"
        );

    }

    return await response.json();
};


// Get portfolio project by ID
export const getPortfolioById = async (id) => {

    const response =
        await fetch(
            `${PORTFOLIO_API}/${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to load portfolio project"
        );

    }

    return await response.json();
};


// Add portfolio project
export const addPortfolio = async (
    portfolio
) => {

    const response =
        await fetch(
            PORTFOLIO_API,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body:
                    JSON.stringify(
                        portfolio
                    ),
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to add portfolio project"
        );

    }

    return await response.json();
};


// Update portfolio project
export const updatePortfolio = async (
    id,
    portfolio
) => {

    const response =
        await fetch(
            `${PORTFOLIO_API}/${id}`,
            {
                method: "PUT",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body:
                    JSON.stringify(
                        portfolio
                    ),
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to update portfolio project"
        );

    }

    return await response.json();
};


// Delete portfolio project
export const deletePortfolio = async (
    id
) => {

    const response =
        await fetch(
            `${PORTFOLIO_API}/${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to delete portfolio project"
        );

    }

    return await response.json();
};


// Enable / Disable portfolio project
export const updatePortfolioStatus = async (
    id,
    status
) => {

    const response =
        await fetch(
            `${PORTFOLIO_API}/${id}`,
            {
                method: "PUT",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    status: status,
                }),
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to update portfolio status"
        );

    }

    return await response.json();
};


// =========================================================
// MESSAGES API
// =========================================================

// Get all messages
export const getAllMessages = async () => {

    const response =
        await fetch(
            MESSAGES_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to load messages"
        );

    }

    return await response.json();
};


// Get message by ID
export const getMessageById = async (id) => {

    const response =
        await fetch(
            `${MESSAGES_API}/${id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to load message"
        );

    }

    return await response.json();
};


// Add message
export const addMessage = async (
    message
) => {

    const response =
        await fetch(
            MESSAGES_API,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body:
                    JSON.stringify(message),
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to send message"
        );

    }

    return await response.json();
};


// Update message status
export const updateMessageStatus = async (
    id,
    status
) => {

    const response =
        await fetch(
            `${MESSAGES_API}/${id}`,
            {
                method: "PUT",

                credentials: "include",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    status: status
                }),
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to update message status"
        );

    }

    return await response.json();
};


// Delete message
export const deleteMessage = async (
    id
) => {

    const response =
        await fetch(
            `${MESSAGES_API}/${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to delete message"
        );

    }

    return await response.json();
};


// =========================================================
// USER NOTIFICATIONS API
// =========================================================

export const getUserNotifications = async () => {

    const response =
        await fetch(
            USER_NOTIFICATIONS_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


export const markUserNotificationAsRead = async (
    id
) => {

    const response =
        await fetch(
            `${USER_NOTIFICATIONS_API}?id=${id}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// =========================================================
// USER PROFILE API
// =========================================================

// Get logged-in user's profile
export const getUserProfile = async () => {

    const response =
        await fetch(
            USER_PROFILE_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Update logged-in user's profile
export const updateUserProfile = async (
    profileData
) => {

    const response =
        await fetch(
            USER_PROFILE_API,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                credentials: "include",

                body:
                    JSON.stringify(
                        profileData
                    ),
            }
        );

    return await handleResponse(response);
};


// =========================================================
// USERS API
// =========================================================

// Get all users
export const getAllUsers = async () => {

    const response =
        await fetch(
            USERS_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// =========================================================
// CLIENT MESSAGES API
// =========================================================

// Get messages for logged-in client
export const getClientMessages = async () => {

    const response =
        await fetch(
            CLIENT_MESSAGES_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Mark client message as read
export const markClientMessageAsRead = async (
    id
) => {

    const response =
        await fetch(
            `${CLIENT_MESSAGES_API}?id=${id}`,
            {
                method: "PUT",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Admin sends message to client
export const sendClientMessage = async (
    messageData
) => {

    const response =
        await fetch(
            CLIENT_MESSAGES_API,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                credentials: "include",

                body:
                    new URLSearchParams(
                        messageData
                    ),
            }
        );

    return await handleResponse(response);
};


// =========================================================
// SETTINGS API
// =========================================================

// Get settings
export const getSettings = async () => {

    const response =
        await fetch(
            SETTINGS_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};


// Update settings
export const updateSettings = async (
    settings
) => {

    const response =
        await fetch(
            SETTINGS_API,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                credentials: "include",

                body:
                    JSON.stringify(settings),
            }
        );

    return await handleResponse(response);
};


// =========================================================
// DASHBOARD API
// =========================================================

// Get dashboard data
export const getDashboard = async () => {

    const response =
        await fetch(
            DASHBOARD_API,
            {
                method: "GET",
                credentials: "include",
            }
        );

    return await handleResponse(response);
};
