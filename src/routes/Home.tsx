import { motion } from 'framer-motion';
import styles from './Home.module.css';

// Particle component for the animation
const Particle = ({ style }: { style: React.CSSProperties }) => <div className={styles.particle} style={style} />;

const Home = () => {
  // ... (scrollToIntro function is unchanged)
  const scrollToIntro = () => { document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' }); };

  // Generate some random particles for the background
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 5 + 2; // size between 2px and 7px
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      bottom: `-${Math.random() * 20 + 20}px`, // Start below the screen
      animationDelay: `${Math.random() * 25}s`,
      animationDuration: `${Math.random() * 15 + 10}s`, // duration between 10s and 25s
    };
    return <Particle key={i} style={style} />;
  });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundGradient}></div>
      {/* ADD THE PARTICLE CONTAINER */}
      <div className={styles.particles}>{particles}</div>
      <motion.div
        className={styles.content}
        // ... (rest of the motion divs are unchanged)
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}
      >
        <motion.h1 className={styles.title} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          Optics,<span className={styles.highlight}>Learn with Visuals</span>
        </motion.h1>
        <motion.p className={styles.subtitle} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          An Interactive Journey into Class 10 Optics — Reflection & Refraction
        </motion.p>
        <motion.button onClick={scrollToIntro} className={`gradientButton ${styles.ctaButton}`} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          Start Lesson
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;