import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#intro', label: 'Intro' },
  { href: '#mirrors', label: 'Mirrors' },
  { href: '#lenses', label: 'Lenses' },
  { href: '#practice', label: 'Practice' },
  { href: '#summary', label: 'Summary' },
];

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800"
        >
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;