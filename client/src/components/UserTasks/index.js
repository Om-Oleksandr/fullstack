import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, getUserTasks, removeTask } from '../../store/taskSlice';
import { useParams } from 'react-router-dom';

const UserTasks = () => {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const {
    tasks: { tasks },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getUserTasks(idUser));
  }, [dispatch, idUser]);
  const onSubmit = (values, formikBag) => {
    dispatch(createTask({ idUser, values }));
  };
  const deleteTask = (idTask) => {
    console.log(idTask);
    dispatch(removeTask({idUser, idTask}))
  };
  return (
    <div>
      {tasks && tasks.length !== 0 ? (
        <div>
          <h4>tasks list</h4>
          <ol>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.content}{' '}
                <button onClick={() => deleteTask(task.id)}>delete task</button>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <h2>user don't have any tasks</h2>
      )}
      <Formik initialValues={{ content: '' }} onSubmit={onSubmit}>
        <Form>
          <Field name="content" />
          <input type="submit" value="add task" />
        </Form>
      </Formik>
    </div>
  );
};

export default UserTasks;
