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
  name: 'Raju',
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
    email: 'raju.physics.lab@example.com', // Editable placeholder
    github: 'https://github.com/raju-saha1546', // GitHub profile
    linkedin: 'https://linkedin.com/in/placeholder-raju', // Editable placeholder
    location: 'University Physics Department',
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
    id: 'm-2026-curr',
    period: '2026 (Present)',
    title: 'Computational Physics & Independent Laboratory Exploration',
    type: 'Milestone',
    description:
      'Developing interactive physics simulations (double pendulum chaos, wave diffraction, Coulomb manifolds) and digital tools. Testing numerical algorithms like RK4 and implicit PDE integration.',
    reflection:
      'Building simulations taught me that writing the code yourself forces you to truly understand the physics. If you miss a sign or misinterpret an initial condition, the simulation reveals the mistake immediately.',
    keyTakeaway: 'Numerical simulation bridges the gap between abstract equations and physical intuition.'
  },
  {
    id: 'm-2025-fall',
    period: 'Late 2025',
    title: 'Hardware Interfacing & Discrete Digital Logic Experiments',
    type: 'Experiment',
    description:
      'Built a physical 4-bit ripple carry adder using discrete 74LS TTL integrated circuits (XOR, AND, OR) on breadboard, coupled with an Arduino microcontroller for test-vector verification and oscilloscope timing.',
    reflection:
      'Debugging floating inputs, breadboard stray capacitance, and propagation delays demystified how physical matter and semiconductor gates actually compute logical and arithmetic operations.',
    keyTakeaway: 'Physical circuits always have noise, parasitic capacitance, and latency that idealized circuit diagrams omit.'
  },
  {
    id: 'm-2025-spring',
    period: 'Mid 2025',
    title: 'Classical Mechanics & Mathematical Formulations',
    type: 'Coursework',
    description:
      'Delved into the principle of stationary action, Lagrangian mechanics, and Hamiltonian dynamics. Solved coupled oscillators, central force orbits, and generalized coordinate transformations.',
    reflection:
      'Transitioning from Newtonian vector forces to energy-based variational principles (Euler-Lagrange) changed how I view nature. The laws of motion emerge naturally from minimizing action.',
    keyTakeaway: 'The variational formulation of physics provides a unifying framework across mechanics, optics, and field theory.'
  },
  {
    id: 'm-2024-fall',
    period: 'Late 2024',
    title: 'First Serious Experimental Physics Lab Course',
    type: 'Experiment',
    description:
      'Conducted formal laboratory investigations: determining Planck\'s constant via stopping potential, verifying thermistor temperature dependencies, and measuring g via compound pendulums with rigorous uncertainty analysis.',
    reflection:
      'I learned that taking the measurements is only 30% of experimental work; understanding your systematic uncertainties, calculating error propagation, and defending your regression fit are what make data credible.',
    keyTakeaway: 'An experimental number without an uncertainty budget is not a measurement—it is just an opinion.'
  },
  {
    id: 'm-2024-spring',
    period: 'Early 2024',
    title: 'Foundational Physics & Calculus Matriculation',
    type: 'Coursework',
    description:
      'Began rigorous undergraduate studies in Newtonian mechanics, special relativity, multivariable calculus, and linear algebra. Started coding physics homework solutions in Python.',
    reflection:
      'Realized that mathematics is not just a calculation tool for physics—it is the native vocabulary in which the universe is articulated.',
    keyTakeaway: 'Strong mathematical fundamentals are the bedrock of physical intuition.'
  }
];
