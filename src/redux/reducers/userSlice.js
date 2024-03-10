            import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
            import {
              fetchUsersAPI,
              addUserAPI,
              deleteUserByIdAPI,
              updateUserByIdAPI,
            } from "../../api/api";

            export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
              return fetchUsersAPI();
            });

            export const addUser = createAsyncThunk("users/addUser", async (userData) => {
              return addUserAPI(userData);
            });

            export const deleteUserById = createAsyncThunk(
              "users/deleteUserById",
              async (userId) => {
                return deleteUserByIdAPI(userId);
              }
            );

            export const updateUserById = createAsyncThunk(
              "users/updateUserById",
              async ({ userId, updatedUserData }) => {
                return updateUserByIdAPI({ userId, updatedUserData });
              }
            );

            const userSlice = createSlice({
              name: "users",
              initialState: {
                users: [],
                loading: false,
                error: null,
              },
              reducers: {},
              extraReducers: (builder) => {
                builder
                  .addCase(fetchUsers.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.loading = false;
                    state.users = action.payload;
                  })
                  .addCase(fetchUsers.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                  })
                  .addCase(addUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(addUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.users.push(action.payload);
                  })
                  .addCase(addUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                  })
                  .addCase(deleteUserById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(deleteUserById.fulfilled, (state, action) => {
                    state.loading = false;
                    state.users = state.users.filter((user) => user.id !== action.payload);
                  })
                  .addCase(deleteUserById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                  })
                  .addCase(updateUserById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(updateUserById.fulfilled, (state, action) => {
                    state.loading = false;
                    state.users = state.users.map((user) =>
                      user.id === action.payload.id ? action.payload : user
                    );
                  })
                  .addCase(updateUserById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                  });
              },
            });

            export default userSlice.reducer;
