import { useState } from 'react';
import { signup, login } from '../../redux/auth/auth-operation';
import { useAppDispatch } from '../../redux/store';
import Footer from '../../components/Footer/Footer';
import s from './HomePage.module.scss';
import google from '../../images/google.png';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appDispatch = useAppDispatch();

  const handleWrite = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSignup = () => {
    appDispatch(signup({ email, password }));
  };

  const handleLogin = () => {
    appDispatch(login({ email, password }));
  };
  const theme = localStorage.getItem('theme');

  return (
    <div>
      <div className={`${s.block} ${theme === 'dark' ? s.dark : ''}`}>
        <p>Login with google </p>
        <a href='https://cww-lari.herokuapp.com/user/google' className={s.link}>
          <img src={google} alt='google logo' className={s.google_logo} />
          Google
        </a>
        <p>Or use email and password</p>
        <div>
          <form action=''>
            <input
              type='text'
              name='email'
              placeholder='Email'
              className={s.input}
              onChange={handleWrite}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              className={s.input}
              onChange={handleWrite}
            />
          </form>
          <div className={s.btn_group}>
            <button onClick={handleSignup} className={s.btn_logout}>
              Sign up
            </button>
            <button onClick={handleLogin} className={s.btn_login}>
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
