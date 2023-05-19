import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../store/groupSlice';
import styles from './GroupForm.module.sass'
const GroupForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    values.userId = 9;
    console.log(values);
    dispatch(createGroup(values));
    //formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{
        title: '',
        image: '',
      }}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        return (
          <Form encType="multipart/form-data" className={styles.form}>
            <Field name="title" placeholder="title" />
            <input
              name="image"
              type="file"
              onChange={(event) => {
                console.dir(event.target);
                formikProps.setFieldValue('image', event.target.files[0]);
              }}
            />
            <input type="submit" value="add new group" />
          </Form>
        );
      }}
    </Formik>
  );
};

export default GroupForm;
