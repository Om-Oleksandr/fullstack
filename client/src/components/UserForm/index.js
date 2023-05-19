import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import styles from './UserForm.module.sass';
const UserForm = (props) => {
  const { isFetching, error } = useSelector((state) => state.users);
  const { onSubmit, action } = props;
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
        <Form className={styles.form}>
          <Field name="firstName" placeholder="First name" />
          <Field name="lastName" placeholder="Last name" />
          <Field name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <Field name="birthday" placeholder="Birthday" />
          <Field
            name="isMale"
            type="checkbox"
            children={() => {
              return (
                <label>
                  <input type="checkbox" />
                  male
                </label>
              );
            }}
          />
          <input type="submit" value={`${action} user`} />
        </Form>
      </Formik>
    </>
  );
};

export default UserForm;
