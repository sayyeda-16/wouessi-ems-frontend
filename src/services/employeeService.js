const API_URL = process.env.REACT_APP_API_URL;

// Fetch Employee Details
export const getEmployeeById = async (empId) => {
    try {
        const response = await fetch(`${API_URL}/employee/${empId}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to get employee details");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return null;
    }
};

// Update Employee Details
export const updateEmployee = async (empId, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/employee/${empId}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update employee details");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating employee details:", error);
        throw error;
    }
};