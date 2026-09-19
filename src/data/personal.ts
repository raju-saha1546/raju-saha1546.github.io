export interface ExploringTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  keyConcepts: string[];
  equation?: string;
}

export interface LearningItem {
  id: string;
  topic: string;
  category: string;
  status: 'Studying' | 'Exploring' | 'Building' | 'Practicing';
  currentFocus: string;
  resourceOrGoal: string;
}

export interface JourneyMilestone {
  id: string;
  period: string; // Year / Term
  title: string;
  type: 'Coursework' | 'Project' | 'Experiment' | 'Milestone' | 'Independent Study';
  description: string;
  reflection: string;
  keyTakeaway: string;
}

export interface PersonalBio {
  name: string;
  role: string;
  tagline: string;
  mainStatement: string;
  supportingStatement: string;
  aboutParagraphs: string[];
  focusAreas: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
    note: string;
  };
}

export const PERSONAL_DATA: PersonalBio = {
  name: 'Raju Saha',
  role: 'Physics Student',
  tagline: 'Physics • Computation • Experiments',
  mainStatement: 'Exploring physics through theory, mathematics, experiment, and code.',
  supportingStatement:
    "I'm interested in understanding physical systems through mathematical reasoning, experimentation, scientific computing, electronics, and simulation.",
  aboutParagraphs: [
    "I am an undergraduate physics student driven by a desire to understand physical laws from their core mathematical roots. Rather than simply memorizing formulas, I want to unpack the assumptions, symmetries, and step-by-step reasoning that produce them.",
    "For me, physics is most exciting at the intersection of theory and tangible practice. I like connecting analytical derivations on paper with actual bench measurements in the lab, testing where idealized models match real-world data and where systematic uncertainties emerge.",
    "I use computation as a scientific thinking tool—writing numerical simulations in Python and C to visualize wave packets, phase space trajectories, and non-linear dynamics that closed-form solutions cannot describe. In parallel, I build small electronics projects with microcontrollers, discrete TTL gates, and analog sensors to learn how scientific instrumentation works from the silicon up."
  ],
  focusAreas: [
    'Deriving physical principles from first principles',
    'Confronting theoretical models with bench experiments',
    'Numerical algorithms & scientific visualization in Python/C',
    'Breadboard electronics, sensor interfacing & instrumentation',
    'Documenting derivations and experimental logs with rigor'
  ],
  contact: {
    email: 'rajusaha1546@gmail.com', // Editable placeholder
    github: 'https://github.com/raju-saha1546', // GitHub profile
    linkedin: '', // Editable placeholder
    location: 'Malda College Physics Department',
    note: 'Open for academic discussions, physics student collaborations, and scientific computing inquiries.'
  }
};

export const WHAT_IM_EXPLORING: ExploringTopic[] = [
  {
    id: 'quantum-physics',
    title: 'Quantum Physics',
    category: 'Fundamental Physics',
    description:
      'Investigating wave-particle duality, operator formalisms, boundary-value Schrödinger equations, and quantum harmonic oscillator states.',
    keyConcepts: ['Schrödinger Equation', 'Wavepacket Tunneling', 'Hermitian Operators'],
    equation: 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi = \\hat{H}\\Psi'
  },
  {
    id: 'quantum-chemistry',
    title: 'Quantum Chemistry',
    category: 'Molecular Physics',
    description:
      'Exploring electronic structure theory, the Born-Oppenheimer separation, molecular orbitals (LCAO), and vibrational-rotational molecular spectroscopy.',
    keyConcepts: ['Born-Oppenheimer', 'LCAO Molecular Orbitals', 'Spectroscopic Transitions'],
    equation: '\\hat{H}_{\\text{elec}} \\psi_e = E_e \\psi_e'
  },
  {
    id: 'computational-physics',
    title: 'Computational Physics',
    category: 'Numerical Simulation',
    description:
      'Solving non-linear differential equations, multi-body gravitational mechanics, and wave propagation using Crank-Nicolson and Runge-Kutta schemes.',
    keyConcepts: ['RK4 Integration', 'Finite Differences', 'Chaos & Lyapunov Exponents'],
    equation: 'y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)'
  },
  {
    id: 'scientific-computing',
    title: 'Scientific Computing',
    category: 'Computation & Tools',
    description:
      'Harnessing NumPy, SciPy, matrix diagonalization, FFT algorithms, and data structures to efficiently model and visualize physical equations.',
    keyConcepts: ['Fast Fourier Transforms', 'Eigenvalue Solvers', 'Vectorized Algorithms'],
    equation: 'X_k = \\sum_{n=0}^{N-1} x_n \\, e^{-i 2\\pi k n / N}'
  },
  {
    id: 'electronics',
    title: 'Electronics & Instrumentation',
    category: 'Hardware',
    description:
      'Designing breadboard circuits, analyzing operational amplifiers, active filtering, logic gates, and microcontroller data acquisition.',
    keyConcepts: ['Op-Amp Active Filters', 'TTL Logic Timing', 'Sensor Acquisition'],
    equation: 'V_{\\text{out}} = -\\frac{R_f}{R_{\\text{in}}} V_{\\text{in}}'
  },
  {
    id: 'experimental-physics',
    title: 'Experimental Physics',
    category: 'Laboratory',
    description:
      'Conducting measurements with oscilloscopes, thermistors, and optical benches, accompanied by careful systematic error budgets and calibration.',
    keyConcepts: ['Error Propagation', 'Optical Alignment', 'Sensor Calibration'],
    equation: '\\sigma_f = \\sqrt{\\sum_i \\left(\\frac{\\partial f}{\\partial x_i} \\sigma_{x_i}\\right)^2}'
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    category: 'Statistical Physics',
    description:
      'Applying weighted least-squares regression, residual diagnostics, goodness-of-fit (R²), and Monte Carlo uncertainty estimation to lab data.',
    keyConcepts: ['Non-linear Regression', 'Residual Plots', 'Steinhart-Hart Fits'],
    equation: '\\chi^2 = \\sum_i \\left(\\frac{y_i - f(x_i)}{\\sigma_i}\\right)^2'
  },
  {
    id: 'mathematical-physics',
    title: 'Mathematical Physics',
    category: 'Mathematics',
    description:
      'Studying Lagrangian mechanics, Fourier & Laplace transforms, complex contour integrals, and partial differential equations governing fields.',
    keyConcepts: ['Euler-Lagrange Equations', 'Green\'s Functions', 'Complex Analysis'],
    equation: '\\frac{d}{dt}\\left(\\frac{\\partial L}{\\partial \\dot{q}_i}\\right) - \\frac{\\partial L}{\\partial q_i} = 0'
  }
];

export const CURRENTLY_LEARNING: LearningItem[] = [
  {
    id: 'learn-1',
    topic: 'Partial Differential Equations in Physics',
    category: 'Mathematical Physics',
    status: 'Studying',
    currentFocus: 'Separation of variables for Laplace & Helmholtz equations in spherical polar coordinates',
    resourceOrGoal: 'Deriving Legendre polynomials and spherical harmonics Y_l^m(θ, φ)'
  },
  {
    id: 'learn-2',
    topic: 'Crank-Nicolson Unitary Solvers',
    category: 'Computational Physics',
    status: 'Building',
    currentFocus: 'Implicit finite-difference time evolution for 1D potential well wave packets',
    resourceOrGoal: 'Testing norm conservation ∫|Ψ|²dx = 1 across 50,000+ simulation steps'
  },
  {
    id: 'learn-3',
    topic: 'Low-Noise Instrumentation Amplifiers',
    category: 'Electronics',
    status: 'Exploring',
    currentFocus: 'Common-mode rejection ratio (CMRR) and differential thermal voltage drift',
    resourceOrGoal: 'Interfacing thermocouple and PT100 sensors on breadboard prototypes'
  },
  {
    id: 'learn-4',
    topic: 'Nonlinear Oscillations & Chaos',
    category: 'Classical Mechanics',
    status: 'Practicing',
    currentFocus: 'Phase space trajectories, Poincaré sections, and bifurcation diagrams',
    resourceOrGoal: 'Simulating the driven damped pendulum and double pendulum in code'
  },
  {
    id: 'learn-5',
    topic: 'Statistical Thermodynamics & Ensembles',
    category: 'Thermal Physics',
    status: 'Studying',
    currentFocus: 'Canonical partition functions, Maxwell-Boltzmann distributions, and density of states',
    resourceOrGoal: 'Connecting microscopic energy quantization with macroscopic heat capacity'
  },
  {
    id: 'learn-6',
    topic: 'Scientific Python Tooling (NumPy & SciPy)',
    category: 'Scientific Computing',
    status: 'Practicing',
    currentFocus: 'Fast vectorization and least-squares curve fitting algorithms',
    resourceOrGoal: 'Automating empirical lab data processing and residual analysis pipelines'
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'm-class12-2024',
    period: '2024',
    title: 'Class 12 / Higher Secondary Education',
    type: 'Milestone',
    description:
      'Completed higher secondary education with a focus on science. Studying fundamental concepts in physics and mathematics during this period sparked my interest in understanding natural phenomena and physical laws through mathematical reasoning.',
    reflection:
      'Working through school-level physics problems and mathematics helped me realize that I wanted to pursue physics seriously at the undergraduate level rather than treating it merely as an exam subject.',
    keyTakeaway: 'Developing a genuine curiosity for physical principles and mathematics motivated me to pursue an undergraduate degree in physics.'
  },
  {
    id: 'm-ug-beginning',
    period: '[Year]',
    title: 'Beginning of Undergraduate Physics',
    type: 'Coursework',
    description:
      'Began my B.Sc. Physics journey, making the transition from school-level physics to university-level study. Started engaging with greater mathematical depth, formal derivations, and structured analytical problem solving.',
    reflection:
      'The transition to university coursework showed me that university-level physics requires moving beyond formula memorization toward understanding how principles are derived from first principles.',
    keyTakeaway: 'Transitioning to undergraduate physics requires developing disciplined study habits and deeper conceptual understanding.'
  },
  {
    id: 'm-building-foundations',
    period: '[Year / Semester]',
    title: 'Building Core Foundations',
    type: 'Coursework',
    description:
      'Worked through core undergraduate physics and mathematics coursework alongside practical laboratory sessions. Focused on strengthening conceptual clarity, problem-solving skills, and learning standard laboratory measurement techniques and data handling.',
    reflection:
      'Coursework and laboratory classes taught me the importance of patience, careful observations, and appreciating the connection between theoretical concepts and experimental measurements.',
    keyTakeaway: 'Building solid fundamentals across theory, mathematics, and laboratory practice is essential for progress in physics.'
  },
  {
    id: 'm-exploring-beyond',
    period: '[Year / Semester]',
    title: 'Exploring Physics Beyond Coursework',
    type: 'Independent Study',
    description:
      'Began exploring topics beyond regular classroom lectures, with a growing interest in using computation, programming, data analysis, and visualization tools to explore and understand physical systems.',
    reflection:
      'Applying basic programming and computational visualization helped me see physics from a different angle, making abstract equations and mathematical relations more intuitive.',
    keyTakeaway: 'Computational tools and independent exploration serve as valuable aids for developing physical intuition.'
  },
  {
    id: 'm-5th-semester-present',
    period: '5th Semester — Present',
    title: '5th Semester: Continuing Undergraduate Physics',
    type: 'Milestone',
    description:
      'Currently studying in the 5th semester of my 4-year B.Sc. Physics (Honours with Research) programme. Continuing to build my understanding of physics through coursework, problem solving, laboratory learning, computation, and independent study.',
    reflection:
      'Reaching the 5th semester has reinforced my commitment to learning physics steadily and thoroughly. I am focused on deepening my subject knowledge and exploring areas of interest as an undergraduate student.',
    keyTakeaway: 'Consistent effort, curiosity, and thorough study continue to guide my undergraduate journey.'
  }
];
