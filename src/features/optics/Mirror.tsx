interface MirrorProps {
  subtype: 'concave' | 'convex';
}

const Mirror = ({ subtype }: MirrorProps) => {
  const cx = 400;
  const cy = 200;
  const radius = 200;
  const height = 200;
  
  const angle = Math.asin(height / (2 * radius));
  const startAngle = Math.PI - angle;
  const endAngle = Math.PI + angle;

  const startX = cx + radius * Math.cos(startAngle);
  const startY = cy - radius * Math.sin(startAngle);
  const endX = cx + radius * Math.cos(endAngle);
  const endY = cy - radius * Math.sin(endAngle);

  const largeArcFlag = 0;
  const sweepFlag = subtype === 'concave' ? 1 : 0;

  const d = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

  return <path d={d} stroke="#94a3b8" strokeWidth="3" fill="none" />; /* slate-400 */
};

export default Mirror;