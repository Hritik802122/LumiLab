import { motion } from 'framer-motion';
import styles from './Quiz.module.css';

interface ResultPanelProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultPanel = ({ score, total, onRestart }: ResultPanelProps) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glassmorphismCard ${styles.resultPanel}`}
    >
      <h3 className={styles.resultTitle}>Quiz Complete!</h3>
      <p className={styles.resultScoreText}>You scored</p>
      <p className={styles.resultScoreNumber}>{score} / {total}</p>
      <div className={styles.progressBarContainer}>
        <motion.div
          className={styles.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Smoother ease
        />
      </div>
      <button
        onClick={onRestart}
        className="gradientButton"
        style={{ marginTop: '1.5rem', padding: '0.75rem 2rem' }}
      >
        Try Again
      </button>
    </motion.div>
  );
};

export default ResultPanel;