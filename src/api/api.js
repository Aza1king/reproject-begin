
import axios from "axios";

const baseURL = "http://localhost:5001";

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with ID ${userId}: ${error.message}`);
  }
};

export const fetchUsersAPI = async () => {
  const response = await axios.get(`${baseURL}/users`);
  return response.data;
};

export const addUserAPI = async (userData) => {
  const response = await axios.post(`${baseURL}/users`, userData);
  return response.data;
};




export const deleteUserByIdAPI = async (userId) => {
  await axios.delete(`${baseURL}/users/${userId}`);
  return userId;
};

export const updateUserByIdAPI = async ({ userId, updatedUserData }) => {
  const response = await axios.put(`${baseURL}/users/${userId}`, updatedUserData);
  return response.data;
};
