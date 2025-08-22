import { motion } from 'framer-motion';
import ControlPanel from '@/components/ControlPanel';
import SimulationCanvas from '@/features/optics/SimulationCanvas';
import styles from './Lab.module.css';

const LensesLab = () => {
  return (
    <motion.div
      className={styles.labContainer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="sectionTitle" style={{ color: 'var(--green-400)' }}>Lenses Lab</h2>
      <p className="sectionSubtitle">
        Now, investigate image formation with convex and concave lenses. Observe the differences in ray paths and image properties.
      </p>
      <div className={styles.labGrid}>
        <div className={styles.leftColumn}>
          {/* We now explicitly tell the components they are for a 'lens' */}
          <SimulationCanvas elementType="lens" />
        </div>
        <div className={styles.controlsContainer}>
          <ControlPanel elementType="lens" />
        </div>
      </div>
    </motion.div>
  );
};

export default LensesLab;