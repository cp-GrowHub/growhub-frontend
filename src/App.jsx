import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from './states/authUser/thunk';
import { asyncPreloadProcess } from './states/isPreload/thunk';
import Loading from './components/common/Loading';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ToDoListPage from './pages/ToDoListPage';
import GoalsPage from './pages/GoalsPage';
import NotesPage from './pages/NotesPage';
import DiscussionPage from './pages/DiscussionPage';
import BlogPage from './pages/BlogPage';
import MyAccountPage from './pages/MyAccountPage';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();

    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <div className="font-poppins min-h-screen w-full transition-all duration-500 ease-in-out flex">
      {authUser ? (
        <>
          <Loading />
          <Sidebar onLogout={onLogout} />
          <div className=" flex-1 flex flex-col p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/todos"
                element={
                  <PrivateRoute>
                    <ToDoListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <PrivateRoute>
                    <GoalsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notes"
                element={
                  <PrivateRoute>
                    <NotesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/discussion"
                element={
                  <PrivateRoute>
                    <DiscussionPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <PrivateRoute>
                    <BlogPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <MyAccountPage />
                  </PrivateRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Loading />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
