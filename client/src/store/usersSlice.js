import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (params = { res: 5 }, thunkAPI) => {
    try {
      const { results } = await fetch(
        'https://randomuser.me/api/?results=' + params.res
      ).then((res) => res.json());
      return results;
      // dispatch(loadUsers(results));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isFetching: false,
    error: null,
    users: [],
  },
  reducers: {
    loadUsers(state, action) {
      // state.users = state.users.push(action);
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

const {
  reducer,
  actions: { loadUsers },
} = usersSlice;
export default reducer;
