import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUser, updateUserInstance } from '../../store/usersSlice';
import { Field, Form, Formik } from 'formik';

const UpdateUserForm = () => {
  const { idUser } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneUser(Number(idUser)));
  }, [dispatch, idUser]);
  const onSubmit = (values) => {
    dispatch(updateUserInstance({ idUser, values }));
  };
  console.log(currentUser);
  return (
    <div>
      {currentUser && currentUser.firstName}
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
          <input type="submit" value="update" />
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateUserForm;
