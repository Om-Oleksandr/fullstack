import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { pendingReducer, rejectedReducer, decorateAsyncThunk } from './helpers';

export const createGroup = decorateAsyncThunk({
  type: 'groups/createGroup',
  thunk: httpClient.postGroup,
});
export const getUserGroups = decorateAsyncThunk({
  type: 'groups/getUserGroups',
  thunk: httpClient.userGroups,
});
export const getAllGroups = decorateAsyncThunk({
  type: 'groups/getAllGroups',
  thunk: httpClient.getGroups,
});

export const getOneGroup = decorateAsyncThunk({
  type: 'groups/getAllGroup',
  thunk: httpClient.getGroup,
});

export const addOneUser = decorateAsyncThunk({
  type: 'groups/addOneUser',
  thunk: httpClient.addUser,
});

export const deleteUser = decorateAsyncThunk({
  type: 'groups/deleteUser',
  thunk: httpClient.removeUser,
});

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    isFetching: false,
    error: null,
    groups: [],
    currentGroup: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGroup.pending, pendingReducer);
    builder.addCase(createGroup.rejected, rejectedReducer);
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.groups.unshift(action.payload);
    });

    builder.addCase(getUserGroups.pending, pendingReducer);
    builder.addCase(getUserGroups.rejected, rejectedReducer);
    builder.addCase(getUserGroups.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.groups = action.payload.Groups;
    });

    builder.addCase(getAllGroups.pending, pendingReducer);
    builder.addCase(getAllGroups.rejected, rejectedReducer);
    builder.addCase(getAllGroups.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.groups = action.payload;
    });
    builder.addCase(getOneGroup.pending, pendingReducer);
    builder.addCase(getOneGroup.rejected, rejectedReducer);
    builder.addCase(getOneGroup.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.currentGroup = action.payload;
    });
    builder.addCase(addOneUser.pending, pendingReducer);
    builder.addCase(addOneUser.rejected, rejectedReducer);
    builder.addCase(addOneUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      action.payload.forEach(elem2 => {
        if (!state.currentGroup.Users.some(elem1=> elem1.id === elem2.id)) {
          state.currentGroup.Users.push(elem2)
        }
      });
    });
    builder.addCase(deleteUser.pending, pendingReducer);
    builder.addCase(deleteUser.rejected, rejectedReducer);
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.currentGroup.Users = state.currentGroup.Users.filter(
        (user) => user.id !== action.payload
      );
    });
  },
});
export default groupSlice.reducer;
