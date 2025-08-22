import { motion } from 'framer-motion';

interface RayProps {
  path: { x: number; y: number }[];
  isVirtual?: boolean;
  color: string;
}

const Ray = ({ path, isVirtual, color }: RayProps) => {
  const d = path.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeDasharray={isVirtual ? "5 5" : "none"}
      markerEnd="url(#arrow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );
};

export default Ray;