import { motion } from 'framer-motion';
import FormulaCard from '@/components/FormulaCard';
import styles from './Summary.module.css';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const Summary = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className="sectionTitle" style={{color: 'var(--violet-400)', border: 'none'}}>Lesson Summary</h2>
        <p className="sectionSubtitle">A quick review of all the key concepts, formulas, and rules from this module.</p>
        <div className={styles.printButtonContainer}>
            <button
              onClick={handlePrint}
              className="gradientButton"
            >
              Print Notes
            </button>
        </div>
      </div>
      
      <div className={styles.content}>
        <motion.div 
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className={styles.sectionTitle}>Key Formulas</h3>
          <div className={styles.formulaGrid}>
            <FormulaCard title="Mirror Formula" formula="1/f = 1/v + 1/u" />
            <FormulaCard title="Lens Formula" formula="1/f = 1/v - 1/u" />
            <FormulaCard title="Magnification" formula="m = -v / u" />
            <FormulaCard title="Sign Convention" formula="u is (−), f is (+/−)" />
          </div>
        </motion.div>
        
        <motion.div 
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className={styles.sectionTitle}>Ray Diagram Rules</h3>
          <div className={styles.cardGrid}>
            <div className={`glassmorphismCard ${styles.card}`}>
              <h4 className={styles.cardTitle}>Concave Mirror / Convex Lens</h4>
              <ul className={styles.list}>
                <li>Ray parallel to axis passes through the focus.</li>
                <li>Ray through the focus becomes parallel to the axis.</li>
                <li>Ray through the center passes undeviated.</li>
              </ul>
            </div>
            <div className={`glassmorphismCard ${styles.card}`}>
              <h4 className={styles.cardTitle}>Convex Mirror / Concave Lens</h4>
               <ul className={styles.list}>
                <li>Ray parallel to axis appears to diverge from the focus.</li>
                <li>Ray towards the focus becomes parallel to the axis.</li>
                <li>Ray towards the center passes undeviated.</li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
            className={styles.section}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className={styles.sectionTitle}>Common Mistakes to Avoid</h3>
          <div className={`glassmorphismCard ${styles.mistakesCard}`}>
            <ul className={styles.mistakesList}>
              <li>Forgetting the sign convention for u, v, and f. Remember, `u` is almost always negative.</li>
              <li>Mixing up the mirror and lens formulas (plus vs. minus sign).</li>
              <li>Incorrectly identifying an image as real or virtual. Check the sign of `v`!</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Summary;