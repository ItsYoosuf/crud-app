// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state for users
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users'); // Replace with your actual API endpoint
  return response.data;
});

// Async thunk for adding a user
export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await axios.post('/api/users', user); // Replace with your actual API endpoint
  return response.data;
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }) => {
  const response = await axios.put(`/api/users/${id}`, user); // Replace with your actual API endpoint
  return response.data;
});

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`/api/users/${id}`); // Replace with your actual API endpoint
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
