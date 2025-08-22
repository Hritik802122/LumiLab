interface FormulaCardProps {
  title: string;
  formula: string;
}

// Inline styles for the content inside the card
const cardContentStyle: React.CSSProperties = {
  padding: '1rem',
  textAlign: 'center', // Center the text inside the card
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#94a3b8', // slate-400
  marginBottom: '0.5rem',
  height: '2.5rem', // Set a fixed height to align titles across cards
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const formulaStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '1.25rem',
  color: 'var(--amber-400)',
};

const FormulaCard = ({ title, formula }: FormulaCardProps) => {
  return (
    // THE FIX: We apply the global .glassmorphismCard class to the root div
    <div className="glassmorphismCard">
      <div style={cardContentStyle}>
        <h5 style={titleStyle}>{title}</h5>
        <p style={formulaStyle}>{formula}</p>
      </div>
    </div>
  );
};

export default FormulaCard;