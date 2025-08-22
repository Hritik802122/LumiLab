import { create } from 'zustand';

export type OpticType = 'mirror' | 'lens';
export type Subtype = 'concave' | 'convex';

interface SimParams {
  u: number;
  f: number;
  h: number;
  subtype: Subtype;
}

interface SimState {
  mirror: SimParams;
  lens: SimParams;
  ui: {
    showPrincipalRays: boolean;
    showExplain: boolean;
  };

  setParams: (type: OpticType, params: Partial<SimParams>) => void;
  toggleShowPrincipalRays: () => void;
  toggleShowExplain: () => void;
}

export const useSimStore = create<SimState>((set) => ({
  mirror: {
    u: -300,
    f: 150,
    h: 50,
    subtype: 'concave',
  },
  lens: {
    u: -300,
    f: 150,
    h: 50,
    subtype: 'convex',
  },
  ui: {
    showPrincipalRays: true,
    showExplain: false,
  },

  setParams: (type, params) =>
    set((state) => ({
      [type]: { ...state[type], ...params },
    })),
  
  toggleShowPrincipalRays: () => set((state) => ({ ui: { ...state.ui, showPrincipalRays: !state.ui.showPrincipalRays } })),
  toggleShowExplain: () => set((state) => ({ ui: { ...state.ui, showExplain: !state.ui.showExplain } })),
}));