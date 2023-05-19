import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { pendingReducer, rejectedReducer, decorateAsyncThunk } from './helpers';

export const createTask = decorateAsyncThunk({
  type: 'groups/createTask',
  thunk: httpClient.postTask,
});

export const getUserTasks = decorateAsyncThunk({
  type: 'groups/getUserTasks',
  thunk: httpClient.getAllUserTasks,
});

export const removeTask = decorateAsyncThunk({
  type: 'groups/removeTask',
  thunk: httpClient.deleteTask,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    isFetching: false,
    error: null,
    tasks: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, pendingReducer);
    builder.addCase(createTask.rejected, rejectedReducer);
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.tasks.push(action.payload);
    });

    builder.addCase(getUserTasks.pending, pendingReducer);
    builder.addCase(getUserTasks.rejected, rejectedReducer);
    builder.addCase(getUserTasks.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.tasks = action.payload;
    });

    builder.addCase(removeTask.pending, pendingReducer);
    builder.addCase(removeTask.rejected, rejectedReducer);
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    });
  },
});
export default tasksSlice.reducer;
