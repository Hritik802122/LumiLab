const SVG_HEIGHT = 400;

interface LensProps {
  subtype: 'convex' | 'concave';
}

const Lens = ({ subtype }: LensProps) => {
  const lensHeight = 200;
  const lensWidth = 30;
  const cx = 400;
  const cy = 200;

  let path;
  if (subtype === 'convex') {
    path = `M ${cx} ${cy - lensHeight / 2} 
            C ${cx + lensWidth} ${cy - lensHeight / 4}, ${cx + lensWidth} ${cy + lensHeight / 4}, ${cx} ${cy + lensHeight / 2}
            C ${cx - lensWidth} ${cy + lensHeight / 4}, ${cx - lensWidth} ${cy - lensHeight / 4}, ${cx} ${cy - lensHeight / 2} Z`;
  } else {
    path = `M ${cx} ${cy - lensHeight / 2} 
            C ${cx - lensWidth / 2} ${cy - lensHeight / 4}, ${cx - lensWidth / 2} ${cy + lensHeight / 4}, ${cx} ${cy + lensHeight / 2}
            L ${cx} ${cy + lensHeight / 2}
            C ${cx + lensWidth / 2} ${cy + lensHeight / 4}, ${cx + lensWidth / 2} ${cy - lensHeight / 4}, ${cx} ${cy - lensHeight / 2} Z`;
  }
  
  return (
    <g>
      <path d={path} fill="rgba(56, 189, 248, 0.1)" stroke="var(--sky-400)" strokeWidth="1.5" />
      <line x1={cx} y1="0" x2={cx} y2={SVG_HEIGHT} stroke="rgba(56, 189, 248, 0.3)" strokeDasharray="2 2" />
    </g>
  );
};

export default Lens;