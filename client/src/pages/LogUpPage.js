import React from 'react';
import UserForm from '../components/UserForm';
import { createUser } from '../store/usersSlice';
import { useDispatch } from 'react-redux';

const LogUpPage = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(createUser(values));
  };
  return (
    <div>
      <UserForm onSubmit={onSubmit} action='add'/>
    </div>
  );
};

export default LogUpPage;
