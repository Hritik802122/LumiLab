import { motion } from 'framer-motion';
import concepts from '@/content/concepts.json';
import Tooltip from '@/components/Tooltip';
import reflectionSvg from '@/assets/reflection.svg';
import refractionSvg from '@/assets/refraction.svg';
import styles from './OpticsIntro.module.css';

// ... (icons, containerVariants, itemVariants are unchanged)
const icons: { [key: string]: string } = {
  reflection: reflectionSvg,
  refraction: refractionSvg,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const OpticsIntro = () => {
  return (
    <div className={styles.container}>
      {/* Use the global title classes */}
      <h2 className="sectionTitle" style={{color: 'var(--violet-400)'}}>Introduction to Optics</h2>
      <p className="sectionSubtitle">
        This module covers the fundamental principles of reflection and refraction. Here are the key learning goals:
      </p>
      <motion.ul
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {concepts.map((concept) => (
          <motion.li 
            key={concept.id} 
            variants={itemVariants} 
            className={`glassmorphismCard ${styles.card}`}
          >
            <img src={icons[concept.icon]} alt="" className={styles.icon}/>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{concept.title}</h3>
              <p className={styles.cardDescription}>{concept.description}</p>
            </div>
            {/* The Tooltip is now fixed and styled */}
            <Tooltip text={concept.tooltip} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default OpticsIntro;