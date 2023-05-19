import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../store/usersSlice';
import { getUserGroups } from '../../store/groupSlice';
import { createTask, getUserTasks, removeTask } from '../../store/taskSlice';
import styles from './UserProfile.module.sass';
const UserProfile = () => {
  const { idUser } = useParams();
  const {
    users: { currentUser, error, isFetching },
    groups: { groups },
    tasks: { tasks },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser(Number(idUser)));
    dispatch(getUserGroups(Number(idUser)));
    dispatch(getUserTasks(idUser));
  }, [dispatch, idUser]);

  const mapGroups = (group) => <li key={group.id}>{group.title}</li>;

  const mapTasks = (task) => (
    <li key={task.id}>
      {task.content}
      <button onClick={() => deleteTask(task.id)}>delete task</button>
    </li>
  );

  const onSubmit = (values, formikBag) => {
    dispatch(createTask({ idUser, values }));
  };

  const deleteTask = (idTask) => {
    dispatch(removeTask({ idUser, idTask }));
  };
  return (
    <>
      {error && <p>{error}</p>}
      {isFetching && <p>loading...</p>}

      {currentUser && (
        <section className={styles.container}>
          <div>
            <h1>{`${currentUser.firstName}'s`} profile</h1>
            <h2>name: {currentUser.firstName}</h2>
            <h2>last name: {currentUser.lastName}</h2>
            <h2>email: {currentUser.email}</h2>
          </div>
          <div className={styles.group_tasks}>
            <div>
              <h2>groups list</h2>
              {groups && groups.length !== 0 ? (
                <ol>{groups.map(mapGroups)}</ol>
              ) : (
                <h4>user don't have any groups</h4>
              )}
            </div>
            <div>
              <h2>tasks list</h2>
              {tasks && tasks.length !== 0 ? (
                <ol>{tasks.map(mapTasks)}</ol>
              ) : (
                <h4>user don't have any tasks</h4>
              )}
              <Formik initialValues={{ content: '' }} onSubmit={onSubmit}>
                <Form>
                  <Field name="content" />
                  <input type="submit" value="add task" />
                </Form>
              </Formik>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserProfile;
