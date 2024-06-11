import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import CreateGoalPage from './pages/CreateGoalPage';
import CreateNotePage from './pages/CreateNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import DetailDiscussionPage from './pages/DetailDiscussionPage';
import CreateDiscussionPage from './pages/CreateDiscussionPage';
import DetailBlogPage from './pages/DetailBlogPage';
import CreateBlogPage from './pages/CreateBlogPage';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = (e) => {
    e.preventDefault();

    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (authUser && location.pathname.startsWith('/shared')) {
      const newPath = location.pathname.replace('/shared', '');
      navigate(newPath, { replace: true });
    }
  }, [authUser, location, navigate]);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  if (isPreload) {
    return null;
  }

  return (
    <div className="font-poppins min-h-screen w-full transition-all duration-500 ease-in-out flex">
      {authUser ? (
        <>
          <Loading />
          <Sidebar onLogout={onLogout} />
          <div className="ml-[8rem] flex-1 flex flex-col p-4">
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
                path="/notes/createNote"
                element={
                  <PrivateRoute>
                    <CreateNotePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notes/:noteId"
                element={
                  <PrivateRoute>
                    <NoteDetailPage />
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
                path="/discussion/:discussionId"
                element={
                  <PrivateRoute>
                    <DetailDiscussionPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/discussion/createDiscussion"
                element={
                  <PrivateRoute>
                    <CreateDiscussionPage />
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
                path="/blog/createBlog"
                element={
                  <PrivateRoute>
                    <CreateBlogPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/blog/:blogId"
                element={
                  <PrivateRoute>
                    <DetailBlogPage />
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
              <Route
                path="/goals/createGoal"
                element={
                  <PrivateRoute>
                    <CreateGoalPage />
                  </PrivateRoute>
                }
              />
            </Routes>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen min-w-full">
          <Loading />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/shared/notes/:noteId" element={<NoteDetailPage />} />
            <Route path="/shared/blog/:blogId" element={<DetailBlogPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
