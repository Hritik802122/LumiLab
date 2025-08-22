interface OpticsResult {
  v: number;
  m: number;
  nature: string;
  isAtInfinity: boolean;
}

const getNature = (v: number, m: number, isMirror: boolean): string => {
  let nature = '';
  // Real vs Virtual
  if (isMirror) {
    nature += v < 0 ? 'Real' : 'Virtual';
  } else { // Lens
    nature += v > 0 ? 'Real' : 'Virtual';
  }

  // Inverted vs Upright
  nature += m < 0 ? ', Inverted' : ', Upright';

  // Size
  const mag = Math.abs(m);
  if (mag > 1.01) {
    nature += ', Magnified';
  } else if (mag < 0.99) {
    nature += ', Diminished';
  } else {
    nature += ', Same Size';
  }
  return nature;
};

// Mirror Formula: 1/v + 1/u = 1/f
export const solveMirror = (u: number, f: number): OpticsResult => {
  if (u === 0 || f === 0) return { v: Infinity, m: Infinity, nature: 'Invalid input', isAtInfinity: true };
  
  const u_inv = 1 / u;
  const f_inv = 1 / f;
  
  if (Math.abs(u_inv - f_inv) < 1e-9) { // Object at focus
    return { v: Infinity, m: Infinity, nature: 'Image at infinity (parallel rays)', isAtInfinity: true };
  }
  
  const v_inv = f_inv - u_inv;
  const v = 1 / v_inv;
  const m = -v / u;
  
  return {
    v,
    m,
    nature: getNature(v, m, true),
    isAtInfinity: false,
  };
};

// Lens Formula: 1/v - 1/u = 1/f
export const solveLens = (u: number, f: number): OpticsResult => {
  if (u === 0 || f === 0) return { v: Infinity, m: Infinity, nature: 'Invalid input', isAtInfinity: true };
  
  const u_inv = 1 / u;
  const f_inv = 1 / f;
  
  if (Math.abs(f_inv + u_inv) < 1e-9) { // Object at focus
    return { v: Infinity, m: Infinity, nature: 'Image at infinity (parallel rays)', isAtInfinity: true };
  }

  const v_inv = f_inv + u_inv;
  const v = 1 / v_inv;
  const m = v / u; // Magnification for lenses is v/u, not -v/u
  
  // To match the visual convention (inverted = negative m), we use h' = m * h.
  // The standard formula m = v/u is for magnitudes. For orientation, m = h'/h. 
  // Let's stick with the more intuitive m = -v/u for sign, and adjust nature string accordingly.
  // Ah, let's correct. The universal m=v/u is correct if v and u are signed correctly with cartesian system. Let's recalculate nature based on v/u.
  // if u is neg, v is pos (real image for convex lens) -> v/u is neg -> inverted. Correct.
  // if u is neg, v is neg (virtual image for convex lens) -> v/u is pos -> upright. Correct.
  // So m = v/u is the correct one to use.

  return {
    v,
    m,
    nature: getNature(v, m, false),
    isAtInfinity: false,
  };
};