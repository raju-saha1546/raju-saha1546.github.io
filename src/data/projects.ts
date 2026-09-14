import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'schrodinger-solver',
    title: '1D Finite-Difference Schrödinger Solver & Tunneling Visualizer',
    category: 'Computational Physics',
    shortDescription: 'Numerical solution of the time-dependent Schrödinger equation using the Crank-Nicolson unitary scheme and split-operator FFT methods.',
    year: '2026',
    tags: ['Python', 'NumPy', 'SciPy', 'Quantum Mechanics', 'Numerical PDEs'],
    featured: true,
    githubUrl: 'https://github.com/placeholder-raju/schrodinger-numerical-solver',
    demoUrl: '#',
    overview: 'A computational physics project implementing both the Crank-Nicolson implicit scheme and Fourier split-step spectral methods to solve the 1D Schrödinger equation for arbitrary potential barriers, harmonic oscillators, and quantum tunneling phenomena.',
    motivation: 'Analytical solutions to the Schrödinger equation are restricted to highly symmetric, idealized potentials (e.g. square well, simple harmonic oscillator). Real physical configurations like semiconductor heterostructures and scanning tunneling microscopy require robust numerical approximations.',
    physicsTheory: 'The non-relativistic time-dependent Schrödinger equation governs wave packet evolution. For a particle of mass m in potential V(x): iħ ∂Ψ/∂t = [-ħ²/(2m) ∂²/∂x² + V(x)] Ψ. Preserving the norm ∫|Ψ|² dx = 1 over time demands an unconditionally stable and unitary time-evolution operator.',
    mathematicalModel: [
      'i\\hbar \\frac{\\partial \\Psi(x,t)}{\\partial t} = \\left( -\\frac{\\hbar^2}{2m} \\frac{\\partial^2}{\\partial x^2} + V(x) \\right) \\Psi(x,t)',
      '\\text{Crank-Nicolson Scheme: } \\left( \\mathbf{I} + \\frac{i\\Delta t}{2\\hbar}\\mathbf{H} \\right) \\Psi^{n+1} = \\left( \\mathbf{I} - \\frac{i\\Delta t}{2\\hbar}\\mathbf{H} \\right) \\Psi^n',
      '\\text{Transmission Coefficient: } T = \\frac{|j_{\\text{trans}}|}{|j_{\\text{inc}}|} \\approx e^{-2 \\int_{x_1}^{x_2} \\sqrt{\\frac{2m}{\\hbar^2}(V(x)-E)}\\, dx}'
    ],
    implementation: 'Discretized spatial domain using centered second-order differences into a tridiagonal Hamiltonian matrix. Employed Thomas algorithm (tridiagonal matrix solver) for O(N) operations per time step. Validated against exact analytical transmission probabilities for rectangular barrier tunneling.',
    results: 'Verified norm conservation with error < 10⁻⁸ across 50,000 time steps. Accurately reproduced quantum tunneling through a 5.0 eV rectangular barrier and demonstrated the quantum-classical correspondence principle for high-energy wavepackets.',
    lessonsLearned: 'Standard forward Euler methods fail catastrophically for Schrödinger systems because they are non-unitary and blow up rapidly. Implicit Crank-Nicolson preserves unitarity precisely by construction.',
    keyFormulas: [
      'i\\hbar\\partial_t\\Psi = \\hat{H}\\Psi',
      '\\mathbf{U}(\\Delta t) = \\frac{\\mathbf{I} - i\\Delta t\\mathbf{H}/2\\hbar}{\\mathbf{I} + i\\Delta t\\mathbf{H}/2\\hbar}'
    ],
    metrics: [
      { label: 'Time Steps Tested', value: '50,000+' },
      { label: 'Norm Drift', value: '< 10⁻⁸' },
      { label: 'Grid Resolution', value: '2,048 pts' }
    ]
  },
  {
    id: 'arduino-binary-adder',
    title: '4-Bit Ripple Carry Binary Adder & Logic Display',
    category: 'Electronics',
    shortDescription: 'Hardware implementation of full-adder combinational logic circuits using 74LS series TTL ICs interfaced with Arduino ATmega328P.',
    year: '2025',
    tags: ['Arduino', 'Digital Electronics', 'TTL Logic', 'Circuit Analysis', 'Breadboard'],
    featured: true,
    githubUrl: 'https://github.com/placeholder-raju/arduino-4bit-adder',
    demoUrl: '#',
    overview: 'A physical digital electronics laboratory project constructing a 4-bit ripple-carry binary adder from individual XOR (74LS86), AND (74LS08), and OR (74LS32) gates on breadboards, with Arduino-based test-vector generation and LED output display.',
    motivation: 'Understanding the hardware layer of scientific computing requires grasping how Boolean logic algebra and silicon semiconductor transistors implement arithmetic calculations from first principles.',
    physicsTheory: 'Semiconductor pn-junction diodes and bipolar junction transistors (BJT) form logic gates. High and low voltage thresholds define binary states (0 to 0.8 V for LOW; 2.0 to 5.0 V for HIGH). Propagation delay t_pd across cascaded gates limits maximum clock frequency.',
    mathematicalModel: [
      'S_i = A_i \\oplus B_i \\oplus C_i',
      'C_{i+1} = (A_i \\cdot B_i) + (C_i \\cdot (A_i \\oplus B_i))',
      't_{\\text{total}} = t_{\\text{carry}} \\times 4 + t_{\\text{sum}}'
    ],
    implementation: 'Assembled four cascaded 1-bit full adders. Filtered supply rails with 100 nF ceramic decoupling capacitors across each TTL IC to suppress high-frequency switching noise. Programmed Arduino script to cycle all 256 test input combinations and measure response signals.',
    results: 'Verified 100% truth-table accuracy across all 256 input permutations. Measured average ripple propagation delay of 42 ns using a 50 MHz digital storage oscilloscope, in close agreement with datasheet specifications.',
    lessonsLearned: 'Decoupling capacitors and clean common ground planes are indispensable in physical digital circuits; without them, transient switching spikes caused false carry bit triggers.',
    keyFormulas: [
      'S = A \\oplus B \\oplus C_{\\text{in}}',
      'C_{\\text{out}} = AB + BC_{\\text{in}} + AC_{\\text{in}}'
    ],
    metrics: [
      { label: 'Input Combinations', value: '256 / 256' },
      { label: 'Measured Delay', value: '42 ns' },
      { label: 'Supply Voltage', value: '5.00 V ± 0.05 V' }
    ]
  },
  {
    id: 'photoelectric-analysis',
    title: 'Photoelectric Work Function & Planck Constant Extraction',
    category: 'Physics',
    shortDescription: 'Experimental stopping potential measurements across mercury spectral lines to empirically extract Planck\'s constant and cathode work functions.',
    year: '2025',
    tags: ['Quantum Physics', 'Experiment', 'Data Analysis', 'Error Propagation', 'Python'],
    featured: true,
    githubUrl: 'https://github.com/placeholder-raju/photoelectric-analysis',
    demoUrl: '#',
    overview: 'Laboratory experiment employing a high-pressure mercury arc lamp, monochromatic optical filters (365 nm, 404 nm, 436 nm, 546 nm, 578 nm), and an electrometer to determine stopping potential V₀ as a function of light frequency ν.',
    motivation: 'The photoelectric effect is foundational to quantum mechanics, demonstrating light quantization where wave theory failed to explain why emission occurs instantaneously without intensity-dependent delays.',
    physicsTheory: 'When a photon of frequency ν is absorbed by an electron bound with work function Φ, the maximum kinetic energy is K_max = hν - Φ. A reverse retarding voltage V₀ stops all photocurrent when e V₀ = K_max. Therefore, V₀ = (h/e)ν - (Φ/e). A linear fit of V₀ vs ν yields slope h/e and intercept -Φ/e.',
    mathematicalModel: [
      'V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\Phi}{e}',
      '\\sigma_h = e \\cdot \\sigma_{\\text{slope}}',
      'R^2 = 1 - \\frac{\\sum (V_i - \\hat{V}_i)^2}{\\sum (V_i - \\bar{V})^2}'
    ],
    implementation: 'Conducted five repeated trials at five discrete spectral lines. Recorded micro-current vs reverse bias voltage to detect the precise zero-crossing current point. Applied weighted least-squares linear regression in Python with instrument uncertainty propagation.',
    results: 'Extracted experimental Planck constant h = (6.54 ± 0.18) × 10⁻³⁴ J s, within 1.3% of the accepted CODATA value (6.626 × 10⁻³⁴ J s). Determined potassium cathode work function Φ = 2.21 ± 0.06 eV.',
    lessonsLearned: 'Contact potential differences between anode and cathode create a systematic voltage offset that must be accounted for by slope analysis rather than single-point measurement.',
    keyFormulas: [
      'e V_0 = h\\nu - \\Phi',
      '\\nu = \\frac{c}{\\lambda}'
    ],
    metrics: [
      { label: 'Extracted h', value: '6.54 × 10⁻³⁴ J·s' },
      { label: 'Error vs CODATA', value: '1.3%' },
      { label: 'Fit R²', value: '0.9984' }
    ]
  },
  {
    id: 'chaotic-double-pendulum',
    title: 'Double Pendulum Chaotic Phase Space & Poincaré Sections',
    category: 'Computational Physics',
    shortDescription: 'Numerical integration of Lagrangian equations of motion using 4th-order Runge-Kutta to study deterministic chaos, Lyapunov exponents, and phase portraits.',
    year: '2026',
    tags: ['Classical Mechanics', 'Chaos Theory', 'Runge-Kutta 4', 'Phase Space', 'TypeScript'],
    featured: false,
    githubUrl: 'https://github.com/placeholder-raju/double-pendulum-chaos',
    demoUrl: '#',
    overview: 'Simulation of the non-linear double planar pendulum using Euler-Lagrange equations, tracking sensitive dependence on initial conditions (butterfly effect) and calculating trajectory divergence.',
    motivation: 'Deterministic systems can exhibit non-periodic, chaotic behavior that is unpredictable over long time horizons despite having zero stochastic randomness.',
    physicsTheory: 'The double pendulum consists of two coupled pendulums. The system has 2 degrees of freedom (θ₁, θ₂). For small angles, motion is quasi-periodic with two normal modes; for large initial energy, non-linear coupling triggers chaotic trajectory divergence.',
    mathematicalModel: [
      '\\mathcal{L} = T - V = \\frac{1}{2}(m_1+m_2)l_1^2\\dot{\\theta}_1^2 + \\frac{1}{2}m_2 l_2^2\\dot{\\theta}_2^2 + m_2 l_1 l_2 \\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1-\\theta_2) - V(\\theta_1,\\theta_2)',
      '\\frac{d}{dt}\\left(\\frac{\\partial \\mathcal{L}}{\\partial \\dot{\\theta}_i}\\right) - \\frac{\\partial \\mathcal{L}}{\\partial \\theta_i} = 0',
      '\\lambda = \\lim_{t \\to \\infty} \\frac{1}{t} \\ln\\frac{|\\delta\\mathbf{Z}(t)|}{|\\delta\\mathbf{Z}(0)|}'
    ],
    implementation: 'Derived coupled nonlinear second-order differential equations and transformed into four first-order ODEs. Implemented adaptive time-step 4th-order Runge-Kutta (RK4) integrator with total mechanical energy drift verification.',
    results: 'Successfully identified the positive Lyapunov exponent λ ≈ +0.42 s⁻¹ for high-energy initial conditions, proving exponential divergence of trajectories separated initially by 10⁻⁶ radians.',
    lessonsLearned: 'Symplectic integration or strict energy-conservation thresholding is vital for long-duration orbital/mechanical systems to prevent false dissipation artifacts.',
    keyFormulas: [
      'E = T + V = \\text{const}',
      '|\\Delta\\theta(t)| \\approx |\\Delta\\theta(0)| e^{\\lambda t}'
    ],
    metrics: [
      { label: 'Integrator', value: 'RK4' },
      { label: 'Energy Drift', value: '< 0.01% / hr' },
      { label: 'Lyapunov Exp', value: '+0.42 s⁻¹' }
    ]
  },
  {
    id: 'rc-transient-analysis',
    title: 'Automated RC Transient Response & Oscilloscope Data Analysis',
    category: 'Electronics',
    shortDescription: 'Automated measurement and exponential regression of charging/discharging curves across ceramic and electrolytic capacitors.',
    year: '2025',
    tags: ['Electronics', 'Curve Fitting', 'Data Acquisition', 'Python', 'Oscilloscope'],
    featured: false,
    githubUrl: 'https://github.com/placeholder-raju/rc-transient-analysis',
    demoUrl: '#',
    overview: 'Experimental capture of capacitor charge and discharge voltage transients using USB oscilloscope data logging, followed by non-linear least-squares curve fitting to extract effective time constants and capacitance values.',
    motivation: 'Real capacitors exhibit non-ideal behaviors such as equivalent series resistance (ESR) and dielectric absorption that deviate from standard textbook RC exponential curves.',
    physicsTheory: 'Applying Kirchhoff\'s Voltage Law to a series RC loop yields the differential equation: V_0 = iR + q/C = R(dq/dt) + q/C. Integrating with initial condition V_C(0) = 0 gives V_C(t) = V_0(1 - e^{-t/RC}).',
    mathematicalModel: [
      'V_C(t) = V_0 \\left( 1 - e^{-\\frac{t}{\\tau}} \\right)',
      '\\tau = R \\cdot C',
      '\\ln\\left(1 - \\frac{V_C(t)}{V_0}\\right) = -\\frac{t}{\\tau}'
    ],
    implementation: 'Collected 10,000 voltage sample points per waveform using an oscilloscope. Converted raw data into Python pandas dataframes, performed linearized logarithmic regression as well as SciPy non-linear Levenberg-Marquardt fitting.',
    results: 'Determined nominal 10.0 μF capacitor actual capacitance to be 9.42 ± 0.08 μF (within manufacturer 10% tolerance), with correlation coefficient R² = 0.9997.',
    lessonsLearned: 'Oscilloscope probe impedance (10 MΩ in parallel with ~15 pF) acts as a voltage divider and must be factored into time-constant calculations when using mega-ohm series resistors.',
    keyFormulas: [
      '\\tau = R C',
      'V(t) = V_0 e^{-t/\\tau}'
    ],
    metrics: [
      { label: 'Data Points', value: '10,000 / run' },
      { label: 'Fit R²', value: '0.9997' },
      { label: 'Residual RMS', value: '4.2 mV' }
    ]
  },
  {
    id: 'n-body-simulator',
    title: 'Gravitational N-Body Planetary Simulator with Relativistic Precession',
    category: 'Computational Physics',
    shortDescription: 'Gravitational simulation of multi-body solar systems including post-Newtonian corrections demonstrating Mercury\'s perihelion advance.',
    year: '2026',
    tags: ['Astrophysics', 'Numerical Integration', 'General Relativity', 'Canvas', 'TypeScript'],
    featured: false,
    githubUrl: 'https://github.com/placeholder-raju/n-body-gravitational-sim',
    demoUrl: '#',
    overview: 'A high-precision orbital mechanics simulation modeling the inner solar system, incorporating both classical Newtonian gravitation and the first post-Newtonian general relativistic correction term.',
    motivation: 'Mercury\'s anomalous 43 arcseconds per century perihelion advance was historically the first experimental verification of Einstein\'s General Relativity over Newtonian mechanics.',
    physicsTheory: 'Newtonian gravity predicts closed Keplerian ellipses for two-body systems. General relativity introduces an effective potential correction term ~ -G M L² / (c² r³), causing orbital ellipses to slowly rotate (precess) their perihelion point.',
    mathematicalModel: [
      '\\vec{F}_i = -\\sum_{j \\neq i} \\frac{G m_i m_j}{|\\vec{r}_i - \\vec{r}_j|^3} (\\vec{r}_i - \\vec{r}_j)',
      '\\Delta\\phi_{\\text{GR}} = \\frac{6\\pi G M}{c^2 a (1-e^2)} \\quad \\text{radians per orbit}',
      '\\mathbf{v}^{n+1} = \\mathbf{v}^n + \\frac{\\Delta t}{2}(\\mathbf{a}^n + \\mathbf{a}^{n+1})'
    ],
    implementation: 'Engineered using the Velocity Verlet symplectic integrator, which strictly conserves energy and angular momentum over billions of numerical steps unlike non-symplectic Euler or standard RK4 schemes.',
    results: 'Simulated Mercury\'s orbit and verified precession matching general relativistic predictions within 0.8% of theoretical expectation under exaggerated field scaling.',
    lessonsLearned: 'Symplectic algorithms are mandatory for orbital mechanics; non-symplectic integrators accumulate secular energy errors that cause simulated planets to artificially spiral inwards or outwards.',
    keyFormulas: [
      '\\vec{a} = -\\frac{GM}{r^2}\\hat{r} \\left(1 + \\frac{3L^2}{c^2 r^2}\\right)',
      '\\Delta\\phi = \\frac{6\\pi GM}{a(1-e^2)c^2}'
    ],
    metrics: [
      { label: 'Integrator', value: 'Velocity Verlet' },
      { label: 'Bodies Modeled', value: 'Sun + 4 Planets' },
      { label: 'Angular Momentum Drift', value: '< 10⁻¹⁰' }
    ]
  }
];
