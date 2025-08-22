import { motion } from 'framer-motion';
import ControlPanel from '@/components/ControlPanel';
import SimulationCanvas from '@/features/optics/SimulationCanvas';
import styles from './Lab.module.css';

const MirrorsLab = () => {
  return (
    <motion.div 
      className={styles.labContainer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="sectionTitle" style={{ color: 'var(--sky-400)' }}>Mirrors Lab</h2>
      <p className="sectionSubtitle">
        Explore image formation using concave and convex mirrors. Drag the object arrow or use the controls to see how the image changes.
      </p>
      <div className={styles.labGrid}>
        <div className={styles.leftColumn}>
          {/* We now explicitly tell the components they are for a 'mirror' */}
          <SimulationCanvas elementType="mirror" />
        </div>
        <div className={styles.controlsContainer}>
          <ControlPanel elementType="mirror" />
        </div>
      </div>
    </motion.div>
  );
};

export default MirrorsLab;