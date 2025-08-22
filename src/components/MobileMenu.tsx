import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileMenu.module.css';

const navLinks = [
  { id: 'home', label: 'Home'},
  { id: 'intro', label: 'Intro' },
  { id: 'mirrors', label: 'Mirrors' },
  { id: 'lenses', label: 'Lenses' },
  { id: 'funfacts', label: 'Facts' },
  { id: 'practice', label: 'Practice' },
  { id: 'summary', label: 'Summary' },
];

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const navContainerVariants = {
    hidden: { },
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.nav
            className={styles.nav}
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                variants={navItemVariants}
                onClick={() => handleNavClick(link.id)}
                className={styles.navButton}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;