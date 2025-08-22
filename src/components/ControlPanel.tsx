import { useSimStore, OpticType } from '@/store/useSimStore';
import { solveMirror, solveLens } from '@/utils/optics';
import Slider from './Slider';
import Toggle from './Toggle';
import FormulaCard from './FormulaCard';
import styles from './ControlPanel.module.css';
import clsx from 'clsx';

interface ControlPanelProps {
  elementType: OpticType;
}

const ControlPanel = ({ elementType }: ControlPanelProps) => {
  const isMirror = elementType === 'mirror';
  
  // Read from the correct slice of the store based on the prop
  const params = useSimStore((state) => state[elementType]);
  const { u, f, h, subtype } = params;
  
  // Get the correct actions from the store
  const { setParams, ui, toggleShowPrincipalRays, toggleShowExplain } = useSimStore();
  const { showPrincipalRays, showExplain } = ui;

  const calculation = isMirror ? solveMirror(u, f) : solveLens(u, f);
  const { v, m, nature } = calculation;

  const type1 = isMirror ? 'concave' : 'convex';
  const type2 = isMirror ? 'convex' : 'concave';

  return (
    <div className={`glassmorphismCard ${styles.panel}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{elementType} Controls</h3>
        <div className={styles.opticTypeContainer}>
          <button 
            className={clsx(styles.opticTypeButton, subtype === type1 && styles.opticTypeButtonActive)}
            onClick={() => setParams(elementType, { subtype: type1, f: isMirror ? 150 : 150 })}
          >
            {isMirror ? "Concave" : "Convex"}
          </button>
          <button 
            className={clsx(styles.opticTypeButton, subtype === type2 && styles.opticTypeButtonActive)}
            onClick={() => setParams(elementType, { subtype: type2, f: isMirror ? -150 : -150 })}
          >
            {isMirror ? "Convex" : "Concave"}
          </button>
        </div>
      </div>

      <Slider label="Object Distance (u)" value={u} min={-450} max={-10} step={1} onChange={(val) => setParams(elementType, { u: val })} unit="px" />
      <Slider label="Focal Length (f)" value={f} min={isMirror && subtype === 'convex' || !isMirror && subtype === 'concave' ? -200 : 50} max={isMirror && subtype === 'convex' || !isMirror && subtype === 'concave' ? -50 : 200} step={1} onChange={(val) => setParams(elementType, { f: val })} unit="px" />
      <Slider label="Object Height (h)" value={h} min={10} max={100} step={1} onChange={(val) => setParams(elementType, { h: val })} unit="px" />

      <div className={styles.toggleRow}>
        <label htmlFor={`show-rays-${elementType}`} className={styles.toggleLabel}>Show Principal Rays</label>
        <Toggle id={`show-rays-${elementType}`} checked={showPrincipalRays} onChange={toggleShowPrincipalRays} ariaLabel="Toggle visibility of principal rays"/>
      </div>
      <div className={styles.toggleRow}>
        <label htmlFor={`explain-${elementType}`} className={styles.toggleLabel}>Explain Mode</label>
        <Toggle id={`explain-${elementType}`} checked={showExplain} onChange={toggleShowExplain} ariaLabel="Toggle explanation overlay"/>
      </div>
      
      <div className={styles.divider}>
        <h4 className={styles.outputsTitle}>Live Outputs</h4>
        <p>Image Distance (v): <span className={styles.outputValue}>{v.toFixed(2)} px</span></p>
        <p>Magnification (m): <span className={styles.outputValue}>{m.toFixed(2)}</span></p>
        <p>Image Nature: <span className={styles.outputValue}>{nature}</span></p>
      </div>
      <FormulaCard title={isMirror ? "Mirror Formula" : "Lens Formula"} formula={isMirror ? "1/f = 1/v + 1/u" : "1/f = 1/v - 1/u"} />
    </div>
  );
};

export default ControlPanel;