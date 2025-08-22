import styles from './Tooltip.module.css';

interface TooltipProps {
  text: string;
}

const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className={styles.tooltipContainer} tabIndex={0}> {/* Make container focusable */}
      <div className={styles.tooltipButton}>?</div>
      <div className={styles.tooltipBox}>
        {text}
        <div className={styles.tooltipArrow}></div>
      </div>
    </div>
  );
};

export default Tooltip;