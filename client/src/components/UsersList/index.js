import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  removeUser,
  updateUserInstance,
} from '../../store/usersSlice';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './UsersList.module.sass';
import UserForm from './../UserForm';
const UsersList = (props) => {
  const [state, setState] = useState(false);
  const [id, setId] = useState(null);
  const { isFetching, error, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let idUser = null;
  const onSubmit = (values) => {
    dispatch(updateUserInstance({ id, values }));
    setState(false);
  };
  useEffect(() => {
    dispatch(getAllUsers({ limit: 5, offset: 0 }));
  }, [dispatch]);
  const deleteUser = (id) => {
    dispatch(removeUser(id));
  };
  const showFrom = (userId) => {
    setId(userId);
    setState(true);
  };
  const closeFrom = () => {
    setState(false);
  };

  console.log(idUser);
  return (
    <>
      {isFetching && <h2>Loading...</h2>}
      {error && <h2>Error!</h2>}
      {!isFetching && !error && (
        <section className={cx(styles.container, { [styles.shown]: state })}>
          <div>
            <h2>users list</h2>
            <ol>
              {users.map((user) => (
                <li key={user.id}>
                  {user.email}
                  <Link to={`/users/${user.id}`}>view profile</Link>
                  <button onClick={() => deleteUser(user.id)}>
                    delete user
                  </button>
                  <button onClick={() => showFrom(user.id)}>update user</button>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.pop_up}>
            <UserForm onSubmit={onSubmit} action='update'/>
            <button onClick={closeFrom}>cancel</button>
          </div>
        </section>
      )}
    </>
  );
};

export default UsersList;
