import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.sass';
const Header = () => {
  return (
    <nav className={styles.navigation}>
      <ol>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/group-create">group create</NavLink>
        </li>
        <li>
          <NavLink to="/registration">registration</NavLink>
        </li>
        <li>
          <NavLink to="/groups">groups</NavLink>
        </li>
      </ol>
    </nav>
  );
};

export default Header;
