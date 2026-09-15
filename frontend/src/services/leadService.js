const API_URL = "https://devlab-backend-4d8f.onrender.com/api/leads";

// Create Lead
export const createLead = async (leadData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(leadData),
    });

    return await response.json();
};

// Get All Leads
export const getAllLeads = async () => {
    const response = await fetch(API_URL);

    return await response.json();
};

// Get Lead By ID
export const getLeadById = async (id) => {
    const response = await fetch(`${API_URL}?id=${id}`);

    return await response.json();
};

// Update Lead Status
export const updateLeadStatus = async (id, status) => {
    const response = await fetch(
        `${API_URL}?id=${id}&status=${encodeURIComponent(status)}`,
        {
            method: "PUT",
        }
    );

    return await response.json();
};

// Delete Lead
export const deleteLead = async (id) => {
    const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
    });

    return await response.json();
};