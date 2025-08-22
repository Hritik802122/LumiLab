import { useState, useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import logo from '@/assets/logo.svg';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

const navLinks = [
  { id: 'home', label: 'Home'},
  { id: 'intro', label: 'Intro' },
  { id: 'mirrors', label: 'Mirrors' },
  { id: 'lenses', label: 'Lenses' },
  { id: 'funfacts', label: 'Facts' },
  { id: 'practice', label: 'Practice' },
  { id: 'summary', label: 'Summary' },
];

// THE DEFINITIVE FIX: A self-contained and fully functional ThemeToggle
const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return true;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ 
                width: '3rem', height: '1.5rem', display: 'flex', alignItems: 'center', 
                borderRadius: '9999px', 
                backgroundColor: isDarkMode ? 'var(--toggle-bg-active)' : 'var(--toggle-bg)',
                padding: '0.25rem', border: 'none', cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            }}
            aria-label="Toggle theme"
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: 'white' }}
            />
        </button>
    )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scope, animate] = useAnimate();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setActiveSection(entry.target.id); }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeButton = navRef.current?.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      animate(scope.current, { left: offsetLeft, width: offsetWidth }, { duration: 0.4, ease: [0.25, 1, 0.5, 1]});
    }
  }, [activeSection, animate, scope]);
  
  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <a href="#home" className={styles.logoLink} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            <img src={logo} alt="LumiLab Logo" className={styles.logoImage} />
            <span className={styles.logoText}>LumiLab</span>
          </a>
          <nav className={styles.nav} ref={navRef}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                data-section={link.id}
                className={`${styles.navLink} ${activeSection === link.id ? styles.navLinkActive : ''}`}
              >
                <span>{link.label}</span>
              </button>
            ))}
            <div ref={scope} className={styles.activeIndicator} />
          </nav>
          
          <div className={styles.controlsContainer}>
            <ThemeToggle />
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={styles.mobileMenuButton}
                aria-label="Open menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMenuOpen ? <line x1="18" y1="6" x2="6" y2="18" /> : <line x1="3" y1="12" x2="21" y2="12" />}
                  {isMenuOpen ? <line x1="6" y1="6" x2="18" y2="18" /> : <line x1="3" y1="6" x2="21" y2="6" />}
                  {isMenuOpen ? null : <line x1="3" y1="18" x2="21" y2="18" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;