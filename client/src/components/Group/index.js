import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneUser, deleteUser, getOneGroup } from '../../store/groupSlice';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import cx from 'classnames';
import { getAllUsers } from '../../store/usersSlice';
import styles from './Group.module.sass';
const Group = () => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const { idGroup } = useParams();
  const {
    groups: { currentGroup },
    users: { users },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getOneGroup(Number(idGroup)));
    dispatch(getAllUsers({ limit: 100, offset: 0 }));
  }, [dispatch, idGroup]);
  
  const onSubmit = (values, formikBag) => {
    console.log(values);
    dispatch(addOneUser({ values, idGroup }));
    formikBag.resetForm()
  };
  const handleClick = (values = {}) => {
    console.log(values);
    dispatch(deleteUser({ idGroup, values }));
  };
  const mapGroupUsers = (user) => (
    <li key={user.id}>
      {user.firstName}{' '}
      <button onClick={() => handleClick({ userId: user.id })}>
        delete user from group
      </button>
    </li>
  );
  const mapAllUsers = (user) => {
    return (
      <li key={user.id}>
        <label style={{ userSelect: 'none' }}>
          <Field name="userId" type="checkbox" value={String(user.id)} />
          {user.firstName}
          {user.lastName}
        </label>
      </li>
    );
  };
  const showFrom = () => setState(!state);
  return (
    <div>
      {currentGroup && (
        <section className={styles.container}>
          <div>
            <h2>group name</h2> <p>{currentGroup.title}</p>
            <h4>group members:</h4>
            <ol>{currentGroup.Users.map(mapGroupUsers)}</ol>
            <button onClick={showFrom}>
              {state ? 'cancel' : 'add user to group'}
            </button>
          </div>
          <div className={cx(styles.form, { [styles.show_form]: state })}>
            <Formik initialValues={{ userId: [] }} onSubmit={onSubmit}>
              <Form>
                <ol role="group">{users.map(mapAllUsers)}</ol>
                <input
                  type="submit"
                  value="add user"
                  className={styles.submit}
                />
              </Form>
            </Formik>
          </div>
        </section>
      )}
    </div>
  );
};

export default Group;
