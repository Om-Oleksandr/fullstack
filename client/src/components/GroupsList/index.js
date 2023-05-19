import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from './../../store/groupSlice';
import { Link } from 'react-router-dom';
import styles from './GroupsList.module.sass';
const GroupsList = () => {
  const dispatch = useDispatch();
  const { error, isFetching, groups } = useSelector((state) => state.groups);
  const mapGroups = (group) => (
    <li key={group.id}>
      {group.title}
      <Link to={`/groups/${group.id}`}>view group</Link>
    </li>
  );
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);
  return (
    <>
      {error && <p>{error}</p>}
      {isFetching && <p>loading...</p>}
      {groups && (
        <section className={styles.container}>
          <ol>{groups.map(mapGroups)}</ol>
        </section>
      )}
    </>
  );
};

export default GroupsList;
