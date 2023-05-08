import { combineReducers } from '@reduxjs/toolkit';
import countReducer from './countSlice';
import todoReducer from './todoSlice';
import usersReducer from './usersSlice';
import groupSlice from './groupSlice';

const rootReducer = combineReducers({
  counter: countReducer,
  todo: todoReducer,
  users: usersReducer,
  groups: groupSlice,
});

export default rootReducer;
