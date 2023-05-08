import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../store/usersSlice';
const UserProfile = () => {
  const { idUser } = useParams();
  const {
    users: { currentUser, error, isFetching },
    groups: { groups },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneUser(Number(idUser)));
  }, [dispatch, idUser]);
  return (
    <>
      {error && <p>{error}</p>}
      {isFetching && <p>loading...</p>}
      {currentUser && (
        <div>
          profile: <h2>{currentUser.email}</h2>
          <h2>{currentUser.firstName}</h2>
        </div>
      )}
    </>
  );
};

export default UserProfile;
