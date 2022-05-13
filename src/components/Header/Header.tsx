import { useSelector } from 'react-redux';
import { getToken } from '../../redux/auth/auth-selector';
import { useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/auth/auth-operation';
import sprite from '../../images/sprite2.svg';
import s from './Header.module.scss';

interface IProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const Header = ({ setTheme }: IProps) => {
  const appDispatch = useAppDispatch();
  const token = useSelector(getToken);
  const handleChangeTheme = () => {
    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };
  const theme = localStorage.getItem('theme');
  return (
    <div className={`${s.header} ${theme === 'dark' ? s.dark : ''}`}>
      <p>Cards With Words</p>
      {token && (
        <button onClick={() => appDispatch(logout())} className={s.btn_logout}>
          <svg width='20' height='20' className={s.delete_icon}>
            <use href={`${sprite}#icon-logout`}></use>
          </svg>
        </button>
      )}
      <button onClick={handleChangeTheme} className={s.btn_theme_switch}>
        {theme === 'light' && (
          <svg width='20' height='20' fill='#000000' stroke='#000000'>
            <use href={`${sprite}#icon-moon`}></use>
          </svg>
        )}
        {theme === 'dark' && (
          <svg width='20' height='20' fill='#fff' stroke='#fff'>
            <use href={`${sprite}#icon-sun`}></use>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Header;
