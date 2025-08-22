import styles from './Footer.module.css';
import logo from '@/assets/logo.svg';

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.logoArea}>
                <img src={logo} alt="LumiLab Logo" className={styles.logoIcon}/>
                <span className={styles.logoText}>LumiLab</span>
            </div>
            <p className={styles.copyright}>
                &copy; {new Date().getFullYear()} LumiLab. An educational project built with passion.
            </p>
        </div>
      </footer>
    );
};
  
export default Footer;