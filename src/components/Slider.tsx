import styles from './ControlPanel.module.css'; // Use the same CSS module

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit: string;
}

const Slider = ({ label, value, min, max, step, onChange, unit }: SliderProps) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderLabelRow}>
        <label className={styles.sliderLabel}>{label}</label>
        <span className={styles.sliderValue}>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.sliderInput}
        aria-label={label}
      />
    </div>
  );
};

export default Slider;