import { motion } from 'framer-motion';
import { useSimStore, OpticType } from '@/store/useSimStore';
import { solveLens, solveMirror } from '@/utils/optics';

interface ExplainOverlayProps {
  elementType: OpticType;
}

const contentBoxStyle: React.CSSProperties = { /* styles unchanged */ };
const overlayStyle: React.CSSProperties = { /* styles unchanged */ };

const ExplainOverlay = ({ elementType }: ExplainOverlayProps) => {
  const params = useSimStore((state) => state[elementType]);
  const { u, f } = params;
  const toggleShowExplain = useSimStore((state) => state.toggleShowExplain);
  
  const isMirror = elementType === 'mirror';
  const calculationResult = isMirror ? solveMirror(u, f) : solveLens(u, f);
  const { v, m } = calculationResult;

  const formula = isMirror ? "1/v + 1/u = 1/f" : "1/v - 1/u = 1/f";
  const formulaName = isMirror ? "Mirror Formula" : "Lens Formula";
  const magnificationFormula = isMirror ? "m = -v/u" : "m = v/u";
  const calculationStep = isMirror ? `1/v = 1/(${f.toFixed(0)}) - 1/(${u.toFixed(0)})` : `1/v = 1/(${f.toFixed(0)}) + 1/(${u.toFixed(0)})`;

  return (
    <motion.div style={overlayStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div style={contentBoxStyle} initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <h3 style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--violet-400)', textAlign: 'center'}}>How it's Calculated</h3>
        <p style={{fontSize: '1rem', color: 'var(--muted-foreground)', textAlign: 'center'}}>
          Using the {formulaName}: <strong style={{fontFamily: 'monospace', color: 'var(--amber-400)'}}>{formula}</strong>
        </p>
        <div style={{backgroundColor: 'var(--background)', padding: '1rem', borderRadius: '0.75rem', fontFamily: 'monospace', textAlign: 'left', fontSize: '0.875rem', border: '1px solid var(--border-color)'}}>
          <p>Given:</p><p>u = {u.toFixed(0)} px</p><p>f = {f.toFixed(0)} px</p>
          <p style={{marginTop: '0.75rem'}}>Calculation:</p><p>{calculationStep}</p>
          <p>1/v = {isMirror ? (1/f - 1/u).toFixed(4) : (1/f + 1/u).toFixed(4)}</p>
          <p style={{fontWeight: 'bold', color: 'var(--green-400)'}}>v = {v.toFixed(2)} px</p>
          <p style={{marginTop: '0.75rem'}}>Magnification ({magnificationFormula}):</p>
          <p style={{fontWeight: 'bold', color: 'var(--green-400)'}}>m = {m.toFixed(2)}</p>
        </div>
        <button onClick={toggleShowExplain} className="gradientButton" style={{width: '100%', marginTop: '1rem'}}>Close Explanation</button>
      </motion.div>
    </motion.div>
  )
}

export default ExplainOverlay;