import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import HomePage from './pages/HomePage/HomePage';
import CardsPage from './pages/CardsPage/CardsPage';
import Header from './components/Header/Header';
import { getToken, getIsLoadingAuth } from './redux/auth/auth-selector';
import { getIsLoadingCards } from './redux/cards/cards-selector';
import { googleLogin } from './redux/auth/auth-operation';
import { useAppDispatch } from './redux/store';
import { handleToken } from './service/service';
import s from './App.module.scss';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  localStorage.setItem('theme', theme);
  const token = useSelector(getToken);
  const isLoadingAuth = useSelector(getIsLoadingAuth);
  const isLoadingCards = useSelector(getIsLoadingCards);
  const appDispatch = useAppDispatch();

  if (token) {
    handleToken.set(token);
  }

  const search = window.location?.search;
  const tokenFromUrl = search?.slice(search.indexOf('token=') + 6);
  if (tokenFromUrl) {
    const isLoginSuccess = appDispatch(googleLogin(tokenFromUrl));
    if (isLoginSuccess) {
      handleToken.set(tokenFromUrl);
    }
  }
  return (
    <div
      className={`${s.app} ${
        localStorage.getItem('theme') === 'dark' ? s.dark : ''
      }`}
    >
      {(isLoadingAuth || isLoadingCards) && (
        <div className={s.spinner_background}>
          <div className={s.spinner}>
            <div className={s.spinner_box}>
              <div className={s.three_quarter_spinner}></div>
            </div>
          </div>
        </div>
      )}
      <Header setTheme={setTheme} />
      <Routes>
        <Route
          path='/'
          element={token ? <Navigate to='/cards' replace /> : <HomePage />}
        />
        <Route
          path='cards'
          element={token ? <CardsPage /> : <Navigate to='/' replace />}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
