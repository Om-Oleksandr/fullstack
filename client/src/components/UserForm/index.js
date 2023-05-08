import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/usersSlice';

const UserForm = () => {
  const { isFetching, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    //
    dispatch(createUser(values));
    //
  };
  return (
    <>
      {isFetching && <p>Loading</p>}
      {error && <h2>{error}</h2>}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          birthday: '',
          isMale: true,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <Field name="firstName" placeholder="firstName" />
          <Field name="lastName" placeholder="lastName" />
          <Field name="email" placeholder="email" />
          <Field name="password" placeholder="password" />
          <Field name="birthday" placeholder="birthday" />
          <Field name="isMale" type="checkbox" />
          <input type="submit" value="add new user" />
        </Form>
      </Formik>
    </>
  );
};

export default UserForm;
