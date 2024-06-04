import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from './states/authUser/thunk';
import { asyncPreloadProcess } from './states/isPreload/thunk';
import Loading from './components/Loading';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());

    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="font-poppins min-h-screen transition-all duration-500 ease-in-out">
        <Loading />
        <header>
          <h1 className="text-4xl text-text">GrowHub</h1>
        </header>
        {/* <Routes>
          <Route path='/*' element={} />
          <Route path='/register' element={} />
        </Routes> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
      <header>
        <h1 className="text-4xl font-bold text-text">GrowHub</h1>
      </header>
    </div>
  );
}

export default App;
