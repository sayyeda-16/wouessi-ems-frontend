const API_URL = process.env.REACT_APP_API_URL;

export const login = async (empId, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/authenticate`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ empId, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Server error. Please try again.");
    }
};
