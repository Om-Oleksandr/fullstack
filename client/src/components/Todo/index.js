import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, setDoneTask } from './../../store/todoSlice';
const Todo = () => {
  const { tasks } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    console.log(values.text);
    if (values.text) {
      dispatch(addTask({ text: values.text }));
      formikBag.resetForm();
    }
  };
  const isDoneTask = (id) => {
    dispatch(setDoneTask({ id }));
  };
  const deleteTask = (id) => {
    dispatch(removeTask({ id }));
  };
  return (
    <section>
      <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
        <Form>
          <Field name="text" />
          <input type="submit" value="Add" />
        </Form>
      </Formik>
      <h2>Tasks list:</h2>
      {tasks.map(({ id, text, isDone }) => (
        <article key={id}>
          <div>
            <h3>{text}</h3>
            <input
              type="checkbox"
              value={isDone}
              checked={isDone}
              onChange={() => isDoneTask(id)}
            />
            <button onClick={() => deleteTask(id)}>delete</button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Todo;
