import { motion } from 'framer-motion';
import { useSimStore, OpticType } from '@/store/useSimStore';

interface DraggableObjectProps {
  elementType: OpticType;
}

const DraggableObject = ({ elementType }: DraggableObjectProps) => {
  const { u, h } = useSimStore((state) => state[elementType]);
  const setParams = useSimStore((state) => state.setParams);
  const y = 200; // ORIGIN_Y

  const handleDrag = (_: any, info: { point: { x: number } }) => {
    const newU = Math.max(-450, Math.min(-10, info.point.x - 400));
    setParams(elementType, { u: newU });
  };
  
  return (
    <motion.g
      drag="x"
      dragConstraints={{ left: -50, right: 390 }}
      dragElastic={0.1}
      onDrag={handleDrag}
      style={{ x: u, y: 0, cursor: 'grab' }} // Positioned relative to the SVG group's origin (0,0)
      whileTap={{ cursor: 'grabbing' }}
    >
        <line x1="0" y1={y} x2="0" y2={y - h} stroke="#f43f5e" strokeWidth="2" />
        <path d={`M 0 ${y-h} l -3 -3 l 6 0 z`} fill="#f43f5e" />
        <text x="0" y={y + 15} fill="#f43f5e" fontSize="12px" textAnchor="middle">Object</text>
    </motion.g>
  );
};

export default DraggableObject;