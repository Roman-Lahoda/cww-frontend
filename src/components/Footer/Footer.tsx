import s from './Footer.module.scss';

const Footer = () => {
  const theme = localStorage.getItem('theme');
  return (
    <div className={`${s.footer} ${theme === 'dark' ? s.dark : ''}`}>
      <p>
        Created by{' '}
        <a
          href='https://github.com/Roman-Lahoda'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className={s.link}>LaRI</span> 👨‍💻
        </a>
      </p>
    </div>
  );
};

export default Footer;
