export type NavTab =
  | 'home'
  | 'about'
  | 'journey'
  | 'projects'
  | 'notes'
  | 'lab'
  | 'tools'
  | 'contact'
  | 'simulations'
  | 'experiments';

export interface Project {
  id: string;
  title: string;
  category: 'Physics' | 'Computational Physics' | 'Electronics' | 'Programming' | 'AI / ML' | 'Data Analysis';
  shortDescription: string;
  year: string;
  tags: string[];
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  overview: string;
  motivation: string;
  physicsTheory: string;
  mathematicalModel: string[];
  implementation: string;
  results: string;
  lessonsLearned: string;
  keyFormulas?: string[];
  metrics?: { label: string; value: string }[];
}

export interface NoteSection {
  id: string;
  title: string;
  content: string;
  latex?: string;
  derivationSteps?: {
    step: string;
    explanation: string;
    latex: string;
  }[];
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface Note {
  id: string;
  title: string;
  category:
    | 'Quantum Mechanics'
    | 'Quantum Chemistry'
    | 'Classical Mechanics'
    | 'Electromagnetism'
    | 'Mathematical Physics'
    | 'Electronics'
    | 'Computational Physics'
    | 'Thermodynamics';
  date: string;
  readTime: string;
  summary: string;
  keyEquation: string;
  sections: NoteSection[];
  relatedTools?: string[];
  references?: string[];
}

export interface LabExperiment {
  id: string;
  date: string;
  title: string;
  experiment: string;
  category: string;
  question: string;
  hypothesis: string;
  theory: string;
  setup: string;
  dataPoints: { x: number; y: number; uncertaintyY?: number }[];
  xLabel: string;
  yLabel: string;
  fitType: 'linear' | 'polynomial' | 'exponential';
  fitEquation: string;
  fitResults: { parameter: string; value: string; error: string }[];
  rSquared: number;
  uncertaintyAnalysis: string;
  conclusion: string;
  notes: string;
}

export interface PhysicalConstant {
  name: string;
  symbol: string;
  latexSymbol: string;
  value: string;
  numericValue: number;
  uncertainty: string;
  unit: string;
  category: 'Fundamental' | 'Electromagnetic' | 'Atomic & Nuclear' | 'Thermodynamics' | 'Astronomical';
  description: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  category: 'Mechanics' | 'Electricity & Magnetism' | 'Waves & Optics' | 'Thermodynamics' | 'Quantum Physics' | 'Electronics';
  latex: string;
  variables: { symbol: string; name: string; unit: string; description: string }[];
  description: string;
  rearrangements: { target: string; latex: string }[];
  workedExample: {
    problem: string;
    given: string;
    solution: string;
    result: string;
  };
  relatedToolId?: string;
}

export interface ToolMeta {
  id: string;
  name: string;
  category: 'Electronics' | 'Mechanics' | 'Waves' | 'Quantum' | 'Thermodynamics' | 'Data Analysis' | 'Utilities';
  description: string;
  iconName: string;
  badge?: string;
}
