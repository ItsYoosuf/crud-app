// src/allAPI.js
import commonAPI from './commonAPI'; // Adjust the path as necessary

// Set the base URL for your API
import SERVER_URL from './serverURL' // Update this if necessary

// Function to get all users
export const getUsers = async () => {
    try {
        const response = await commonAPI('GET', SERVER_URL);
        return response.data; // Assuming response.data contains the user data
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Function to create a new user
export const createUser = async (user) => {
    try {
        const response = await commonAPI('POST', SERVER_URL, user);
        console.log(response.data);
        return response.data; // Assuming response.data contains the created user data
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Function to update an existing user
export const updateUser = async (id, user) => {
    try {
        const response = await commonAPI('PUT', `${SERVER_URL}/${id}`, user);
        return response.data; // Assuming response.data contains the updated user data
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Function to delete a user
export const deleteUser = async (id) => {
    try {
        await commonAPI('DELETE', `${SERVER_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
