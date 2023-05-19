import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateUserForm from './components/UpdateUserForm';
import GroupsList from './components/GroupsList';
import Group from './components/Group';
import UserTasks from './components/UserTasks';
import Header from './components/Header';
// import HomePage from './pages/HomePage';
// import UsersPage from './pages/UsersPage';
// import LogUpPage from './pages/LogUpPage';
// import GroupsPage from './pages/GroupsPage';
// import UserProfile from './components/UserProfile';
const HomePage = lazy(() => import('./pages/HomePage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const LogUpPage = lazy(() => import('./pages/LogUpPage'));
const GroupsPage = lazy(() => import('./pages/GroupsPage'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/group-create" element={<GroupsPage />} />
            <Route path="/registration" element={<LogUpPage />} />
            <Route path="/users/:idUser" element={<UserProfile />} />
            <Route
              path="/users/:idUser/instance"
              element={<UpdateUserForm />}
            />
            <Route path="/groups" element={<GroupsList />} />
            <Route path="/groups/:idGroup" element={<Group />} />
            <Route path="/users/:idUser/tasks" element={<UserTasks />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
