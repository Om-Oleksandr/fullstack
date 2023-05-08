import { createSlice } from '@reduxjs/toolkit';
import * as httpClient from '../api';
import { pendingReducer, rejectedReducer, decorateAsyncThunk } from './helpers';

export const createGroup = decorateAsyncThunk({
  type: 'groups/createGroup',
  thunk: httpClient.postGroup,
});

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    isFetching: false,
    error: null,
    groups: [],
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
  },
});

export default groupSlice.reducer;
