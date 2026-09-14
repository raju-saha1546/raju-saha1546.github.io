import { FormulaItem } from '../types';

export const FORMULAS_DATA: FormulaItem[] = [
  {
    id: 'ohms-law',
    name: "Ohm's Law",
    category: 'Electronics',
    latex: 'V = I \\cdot R',
    description: 'Relates electric potential difference, current intensity, and resistance in an ideal ohmic conductor.',
    variables: [
      { symbol: 'V', name: 'Voltage / Potential Difference', unit: 'V (Volts)', description: 'Electric potential across conductor' },
      { symbol: 'I', name: 'Electric Current', unit: 'A (Amperes)', description: 'Rate of charge flow' },
      { symbol: 'R', name: 'Resistance', unit: 'Ω (Ohms)', description: 'Opposition to current flow' }
    ],
    rearrangements: [
      { target: 'Current (I)', latex: 'I = \\frac{V}{R}' },
      { target: 'Resistance (R)', latex: 'R = \\frac{V}{I}' },
      { target: 'Electric Power (P)', latex: 'P = V I = I^2 R = \\frac{V^2}{R}' }
    ],
    workedExample: {
      problem: 'Calculate the current flowing through a 470 Ω resistor connected across a 5.0 V regulated DC source.',
      given: 'V = 5.0 V, R = 470 Ω',
      solution: 'I = V / R = 5.0 / 470 = 0.01064 A',
      result: '10.64 mA (Power dissipation = 53.2 mW)'
    },
    relatedToolId: 'ohms-law'
  },
  {
    id: 'newton-second-law',
    name: "Newton's Second Law of Motion",
    category: 'Mechanics',
    latex: '\\vec{F} = \\frac{d\\vec{p}}{dt} = m\\vec{a}',
    description: 'The vector sum of forces on an object equals the rate of change of its linear momentum with time.',
    variables: [
      { symbol: 'F', name: 'Net External Force', unit: 'N (Newtons = kg m s⁻²)', description: 'Vector sum of forces' },
      { symbol: 'm', name: 'Inertial Mass', unit: 'kg (kilograms)', description: 'Mass of the physical body' },
      { symbol: 'a', name: 'Acceleration', unit: 'm s⁻²', description: 'Time rate of velocity change' }
    ],
    rearrangements: [
      { target: 'Acceleration (a)', latex: 'a = \\frac{F}{m}' },
      { target: 'Mass (m)', latex: 'm = \\frac{F}{a}' }
    ],
    workedExample: {
      problem: 'Determine the acceleration produced on an 850 kg vehicle when subjected to an effective net driving force of 3400 N.',
      given: 'm = 850 kg, F = 3400 N',
      solution: 'a = F / m = 3400 / 850 = 4.0 m s⁻²',
      result: '4.00 m s⁻²'
    },
    relatedToolId: 'projectile'
  },
  {
    id: 'de-broglie',
    name: 'de Broglie Matter Wave Relation',
    category: 'Quantum Physics',
    latex: '\\lambda = \\frac{h}{p} = \\frac{h}{m v}',
    description: 'Associates a quantum wavelength with any material particle having momentum p, postulating wave-particle duality.',
    variables: [
      { symbol: 'λ', name: 'de Broglie Wavelength', unit: 'm (meters)', description: 'Wavelength of the matter wave' },
      { symbol: 'h', name: 'Planck Constant', unit: 'J s', description: '6.62607015 × 10⁻³⁴ J s' },
      { symbol: 'p', name: 'Relativistic / Classical Momentum', unit: 'kg m s⁻¹', description: 'p = mv' }
    ],
    rearrangements: [
      { target: 'Momentum (p)', latex: 'p = \\frac{h}{\\lambda}' },
      { target: 'Velocity (v)', latex: 'v = \\frac{h}{m \\lambda}' },
      { target: 'Kinetic Energy (E_k)', latex: '\\lambda = \\frac{h}{\\sqrt{2m E_k}}' }
    ],
    workedExample: {
      problem: 'Calculate the de Broglie wavelength of a thermal electron (m = 9.109 × 10⁻³¹ kg) accelerated across 100 V potential.',
      given: 'E_k = 100 eV = 1.602 × 10⁻¹⁷ J, m = 9.109 × 10⁻³¹ kg',
      solution: 'p = √(2 · m · E_k) = √(2 · 9.109e-31 · 1.602e-17) = 5.401 × 10⁻²⁴ kg m/s. λ = 6.626e-34 / 5.401e-24 = 1.227 × 10⁻¹⁰ m',
      result: '0.123 nm (Comparable to interatomic crystal spacing in electron diffraction)'
    },
    relatedToolId: 'quantum'
  },
  {
    id: 'photoelectric-effect',
    name: "Einstein's Photoelectric Equation",
    category: 'Quantum Physics',
    latex: 'K_{\\text{max}} = h\\nu - \\Phi = e V_0',
    description: 'Energy conservation in photoelectric absorption: kinetic energy of emitted photoelectrons equals photon energy minus material work function.',
    variables: [
      { symbol: 'K_max', name: 'Max Kinetic Energy', unit: 'J or eV', description: 'Maximum energy of emitted electrons' },
      { symbol: 'hν', name: 'Incident Photon Energy', unit: 'J or eV', description: 'Energy of incoming photon packet' },
      { symbol: 'Φ', name: 'Work Function', unit: 'eV or J', description: 'Minimum energy to liberate electron from metal surface' },
      { symbol: 'V_0', name: 'Stopping Potential', unit: 'V (Volts)', description: 'Retarding potential required to reduce photocurrent to zero' }
    ],
    rearrangements: [
      { target: 'Stopping Potential (V_0)', latex: 'V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi}{e}' },
      { target: 'Threshold Frequency (ν_0)', latex: '\\nu_0 = \\frac{\\Phi}{h}' }
    ],
    workedExample: {
      problem: 'UV light with λ = 250 nm strikes a cesium target with work function Φ = 2.14 eV. Find the maximum kinetic energy and stopping potential.',
      given: 'λ = 250 nm, Φ = 2.14 eV. Photon energy = hc/λ = (1240 eV nm) / 250 nm = 4.96 eV',
      solution: 'K_max = 4.96 eV - 2.14 eV = 2.82 eV. V_0 = K_max / e = 2.82 V',
      result: 'K_max = 2.82 eV (4.52 × 10⁻¹⁹ J), Stopping Potential V_0 = 2.82 V'
    },
    relatedToolId: 'quantum'
  },
  {
    id: 'schrodinger-time-dependent',
    name: 'Time-Dependent Schrödinger Equation',
    category: 'Quantum Physics',
    latex: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\vec{r},t) = \\hat{H}\\Psi(\\vec{r},t) = \\left(-\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\vec{r},t)\\right)\\Psi(\\vec{r},t)',
    description: 'Fundamental differential equation governing the quantum state evolution of non-relativistic matter waves.',
    variables: [
      { symbol: 'Ψ', name: 'Wave Function', unit: 'm⁻³/²', description: 'Complex probability amplitude' },
      { symbol: 'ħ', name: 'Reduced Planck Constant', unit: 'J s', description: '1.054571817 × 10⁻³⁴ J s' },
      { symbol: 'Ĥ', name: 'Hamiltonian Operator', unit: 'J', description: 'Total energy observable operator' },
      { symbol: 'V(r,t)', name: 'Potential Energy', unit: 'J', description: 'External potential landscape' }
    ],
    rearrangements: [
      { target: 'Time-Independent Form', latex: '\\hat{H}\\psi_n(x) = E_n\\psi_n(x)' },
      { target: 'Probability Density', latex: 'P(x,t) = |\\Psi(x,t)|^2 = \\Psi^*(x,t)\\Psi(x,t)' }
    ],
    workedExample: {
      problem: 'State the ground-state energy for a particle in an infinite 1D potential well of width L = 1.0 nm containing an electron.',
      given: 'm = 9.109 × 10⁻³¹ kg, L = 1.0 × 10⁻⁹ m, n = 1',
      solution: 'E_1 = (π² ħ²) / (2 m L²) = (h²)/(8 m L²) = (6.626e-34)² / (8 · 9.109e-31 · 1.0e-18) = 6.025 × 10⁻²⁰ J',
      result: '0.376 eV'
    },
    relatedToolId: 'quantum'
  },
  {
    id: 'rc-time-constant',
    name: 'RC Circuit Transient Equation',
    category: 'Electronics',
    latex: 'V_C(t) = V_0 \\left(1 - e^{-t / \\tau}\\right), \\quad \\tau = R \\cdot C',
    description: 'Describes capacitor charging potential across time in a series RC network connected to a constant DC source.',
    variables: [
      { symbol: 'V_C(t)', name: 'Capacitor Voltage at time t', unit: 'V', description: 'Instantaneous voltage across capacitor' },
      { symbol: 'V_0', name: 'Applied DC Supply', unit: 'V', description: 'Final steady-state charging voltage' },
      { symbol: 'τ', name: 'Time Constant', unit: 's (seconds)', description: 'Time to reach ~63.2% of final voltage' },
      { symbol: 'R', name: 'Series Resistance', unit: 'Ω', description: 'Current limiting resistor' },
      { symbol: 'C', name: 'Capacitance', unit: 'F (Farads)', description: 'Capacitor value' }
    ],
    rearrangements: [
      { target: 'Discharge Voltage', latex: 'V_C(t) = V_0 \\, e^{-t / \\tau}' },
      { target: 'Time to Reach Voltage V', latex: 't = -\\tau \\ln\\left(1 - \\frac{V_C}{V_0}\\right)' }
    ],
    workedExample: {
      problem: 'Find the time constant and 99% charge time for R = 10 kΩ and C = 100 μF.',
      given: 'R = 10,000 Ω, C = 100 × 10⁻⁶ F',
      solution: 'τ = R · C = 10,000 × 0.0001 = 1.0 s. t_99% = -ln(1 - 0.99) · τ ≈ 4.61 · τ = 4.61 s',
      result: 'τ = 1.00 s, t(99%) = 4.61 s'
    },
    relatedToolId: 'circuit'
  },
  {
    id: 'projectile-trajectory',
    name: 'Kinematic Projectile Trajectory',
    category: 'Mechanics',
    latex: 'y(x) = x\\tan\\theta - \\frac{g x^2}{2 v_0^2 \\cos^2\\theta}',
    description: 'Parabolic coordinate equation of ballistic trajectory under constant gravitational acceleration g without air resistance.',
    variables: [
      { symbol: 'v_0', name: 'Initial Velocity', unit: 'm s⁻¹', description: 'Launch speed magnitude' },
      { symbol: 'θ', name: 'Launch Angle', unit: 'rad or degrees', description: 'Angle of elevation above horizontal' },
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm s⁻²', description: 'Standard terrestrial g = 9.80665 m s⁻²' },
      { symbol: 'R', name: 'Horizontal Range', unit: 'm', description: 'Total horizontal distance traveled' }
    ],
    rearrangements: [
      { target: 'Horizontal Range (R)', latex: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}' },
      { target: 'Maximum Height (H)', latex: 'H = \\frac{v_0^2 \\sin^2\\theta}{2g}' },
      { target: 'Flight Time (T)', latex: 'T = \\frac{2 v_0 \\sin\\theta}{g}' }
    ],
    workedExample: {
      problem: 'A projectile is launched on Earth with v₀ = 35 m/s at θ = 45°. Compute its maximum height, range, and flight time.',
      given: 'v₀ = 35 m/s, θ = 45°, g = 9.81 m/s²',
      solution: 'R = (35² · sin(90°))/9.81 = 1225/9.81 = 124.87 m. H = (35² · sin²(45°))/(2 · 9.81) = (1225 · 0.5)/19.62 = 31.22 m. T = (2 · 35 · sin(45°))/9.81 = 5.04 s',
      result: 'Range = 124.9 m, Max Height = 31.2 m, Flight Time = 5.04 s'
    },
    relatedToolId: 'projectile'
  },
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law (Equation of State)',
    category: 'Thermodynamics',
    latex: 'P V = n R T = N k_B T',
    description: 'Thermodynamic equation relating pressure, volume, temperature, and quantity of an idealized non-interacting gas.',
    variables: [
      { symbol: 'P', name: 'Absolute Pressure', unit: 'Pa (Pascals)', description: 'Force per unit boundary area' },
      { symbol: 'V', name: 'System Volume', unit: 'm³', description: 'Total geometric volume of container' },
      { symbol: 'n', name: 'Amount of Substance', unit: 'mol', description: 'Number of moles' },
      { symbol: 'R', name: 'Universal Gas Constant', unit: 'J mol⁻¹ K⁻¹', description: '8.314462618 J mol⁻¹ K⁻¹' },
      { symbol: 'T', name: 'Absolute Thermodynamic Temperature', unit: 'K', description: 'Temperature in Kelvins' }
    ],
    rearrangements: [
      { target: 'Pressure (P)', latex: 'P = \\frac{n R T}{V}' },
      { target: 'Volume (V)', latex: 'V = \\frac{n R T}{P}' },
      { target: 'Temperature (T)', latex: 'T = \\frac{P V}{n R}' }
    ],
    workedExample: {
      problem: 'Find the volume occupied by 1.0 mol of ideal gas at standard STP conditions (P = 101.325 kPa, T = 273.15 K).',
      given: 'n = 1.0 mol, P = 101325 Pa, T = 273.15 K, R = 8.31446 J/(mol K)',
      solution: 'V = (1.0 · 8.31446 · 273.15) / 101325 = 2271.1 / 101325 = 0.022414 m³',
      result: '22.414 L (Molar volume of ideal gas at STP)'
    },
    relatedToolId: 'units'
  }
];
