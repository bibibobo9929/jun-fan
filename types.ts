
export type KELO = 'K' | 'E' | 'L' | 'O';

// Added missing Basket interface to fix import error in constants.tsx
export interface Basket {
  id: number;
  name: string;
  description: string;
}

export interface Score {
  K: number;
  E: number;
  L: number;
  O: number;
}

export interface Option {
  id: string;
  text?: string;
  front_text?: string;
  logic?: string;
  score?: Partial<Score>;
  reality_index?: {
    output_level?: number;
    market_validation?: number;
  };
  modifiers?: {
    N_tendency?: 'High' | 'Low';
    A_tendency?: 'High' | 'Low';
    O_bonus?: boolean;
    E_tendency?: 'Low';
    O_potential?: 'High';
  };
}

export interface Question {
  id: string;
  stem?: string;
  front_stem?: string;
  skeleton?: string;
  type?: 'single_choice' | 'free_text';
  options?: Option[];
  nlp_enrichment?: boolean;
  extras?: { id: string; type: string; label: string; required: boolean }[];
}

export interface Author {
  author_id: string;
  author_name: string;
  country_or_language: string;
  six_baskets_main: string;
  six_baskets_secondary?: string;
  KELO_primary: KELO;
  KELO_secondary?: KELO | null;
  representative_works: string[];
  why_recommend: string;
  learning_handle: string;
  evidence_links: { title: string; url: string }[];
  source_quality: 'A' | 'B' | 'C';
}

export interface SurveyResult {
  phase1Scores: Score;
  phase2Scores: Score;
  totalScores: Score;
  realityIndex: {
    outputLevel: number;
    marketValidation: number;
  };
  modifiers: {
    N_tendency?: string;
    A_tendency?: string;
    E_tendency?: string;
  };
  primaryType: KELO;
  secondaryType: KELO | null;
  consistencyLevel: 'High' | 'Medium' | 'Low';
  gaps: Score;
}
