import { useSimStore, OpticType } from '@/store/useSimStore';
import { solveMirror, solveLens } from '@/utils/optics';
import { getRayPaths } from '@/utils/geometry';
import DraggableObject from './DraggableObject';
import Mirror from './Mirror';
import Lens from './Lens';
import Ray from './Ray';
import ExplainOverlay from './ExplainOverlay';
import { AnimatePresence } from 'framer-motion';

const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;
const ORIGIN_X = SVG_WIDTH / 2;
const ORIGIN_Y = SVG_HEIGHT / 2;

interface SimulationCanvasProps {
  elementType: OpticType;
}

const SimulationCanvas = ({ elementType }: SimulationCanvasProps) => {
  const isMirror = elementType === 'mirror';
  
  const params = useSimStore((state) => state[elementType]);
  const { u, f, h, subtype } = params;
  const { showPrincipalRays, showExplain } = useSimStore((state) => state.ui);
  
  const calculation = isMirror ? solveMirror(u, f) : solveLens(u, f);
  const { v, m, nature, isAtInfinity } = calculation;
  const imageHeight = h * m;

  const rayPaths = getRayPaths({ u, f, h, v, imageHeight, elementType, subtype });
  const isVirtualImage = nature.includes('Virtual');

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="glassmorphismCard"
        style={{ width: '100%', height: 'auto', backgroundColor: 'var(--simulation-bg)', padding: '0.5rem' }}
        aria-label={`Simulation of a ${subtype} ${elementType}`}
        role="img"
      >
        <title>Optical Simulation Canvas</title>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        
        <line x1="0" y1={ORIGIN_Y} x2={SVG_WIDTH} y2={ORIGIN_Y} stroke="#475569" strokeWidth="1" />

        {isMirror ? <Mirror subtype={subtype} /> : <Lens subtype={subtype} />}

        <circle cx={ORIGIN_X + f} cy={ORIGIN_Y} r="3" fill="var(--amber-400)" />
        <text x={ORIGIN_X + f} y={ORIGIN_Y + 15} fill="var(--amber-400)" fontSize="12px" textAnchor="middle">F</text>
        
        {isMirror && (
          <>
            <circle cx={ORIGIN_X + 2*f} cy={ORIGIN_Y} r="3" fill="#67e8f9" />
            <text x={ORIGIN_X + 2*f} y={ORIGIN_Y + 15} fill="#67e8f9" fontSize="12px" textAnchor="middle">C</text>
          </>
        )}
        {!isMirror && (
          <>
            <circle cx={ORIGIN_X - f} cy={ORIGIN_Y} r="3" fill="var(--amber-400)" />
            <text x={ORIGIN_X - f} y={ORIGIN_Y + 15} fill="var(--amber-400)" fontSize="12px" textAnchor="middle">F'</text>
          </>
        )}
        
        <DraggableObject elementType={elementType} />

        {!isAtInfinity && (
          <g>
            <line x1={ORIGIN_X + v} y1={ORIGIN_Y} x2={ORIGIN_X + v} y2={ORIGIN_Y - imageHeight} stroke="var(--sky-400)" strokeOpacity={isVirtualImage ? 0.7 : 1} strokeWidth="2" strokeDasharray={isVirtualImage ? "4 4" : "none"}/>
            <path d={`M ${ORIGIN_X + v} ${ORIGIN_Y - imageHeight} l -3 3 l 6 0 z`} fill="var(--sky-400)" fillOpacity={isVirtualImage ? 0.7 : 1}/>
            <text x={ORIGIN_X + v} y={ORIGIN_Y - imageHeight - 10} fill="var(--sky-400)" fontSize="12px" textAnchor="middle">Image</text>
          </g>
        )}
        {showPrincipalRays && rayPaths.map((ray, index) => (
          <Ray key={index} path={ray.path} isVirtual={ray.isVirtual} color={ray.color} />
        ))}
      </svg>
      <AnimatePresence>
        {showExplain && <ExplainOverlay elementType={elementType} />}
      </AnimatePresence>
    </div>
  );
};

export default SimulationCanvas;