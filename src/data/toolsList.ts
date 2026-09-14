import { ToolMeta } from '../types';

export const TOOLS_LIST: ToolMeta[] = [
  // Electronics
  {
    id: 'resistor-calc',
    name: 'Resistor Color Code Calculator',
    category: 'Electronics',
    description: 'Interactive 4-band, 5-band, and 6-band resistor decoder with dual-mode Color → Resistance and Resistance → Color conversion.',
    iconName: 'Cpu',
    badge: 'Hardware'
  },
  {
    id: 'ohms-law',
    name: "Ohm's Law & Power Solver",
    category: 'Electronics',
    description: 'Solves for any unknown variable among Voltage (V), Current (I), Resistance (R), and Power (P) with dynamic circuit diagram.',
    iconName: 'Zap',
    badge: 'Fundamental'
  },
  {
    id: 'circuit-sim',
    name: 'DC Circuit Analyzer',
    category: 'Electronics',
    description: 'Educational circuit solver for DC loops, series-parallel resistor networks, LEDs, and equivalent resistance calculations.',
    iconName: 'Layers',
    badge: 'Interactive'
  },

  // Mechanics
  {
    id: 'projectile-sim',
    name: 'Kinematic Projectile Simulator',
    category: 'Mechanics',
    description: '2D ballistic trajectory simulator with adjustable launch speed, angle, planetary gravity presets, and air drag modeling.',
    iconName: 'Compass',
    badge: 'Simulation'
  },
  {
    id: 'oscillator-sim',
    name: 'Harmonic Oscillator & Phase Space',
    category: 'Mechanics',
    description: 'Mass-spring dynamic oscillator showing live mechanical motion, damping effects, displacement, velocity, and phase space orbit.',
    iconName: 'Activity',
    badge: 'Simulation'
  },
  {
    id: 'pendulum-sim',
    name: 'Simple & Damped Pendulum',
    category: 'Mechanics',
    description: 'Real-time pendulum motion with variable length, gravitational field, initial angular deflection, and time series plots.',
    iconName: 'Clock',
    badge: 'Simulation'
  },
  {
    id: 'double-pendulum-sim',
    name: 'Chaotic Double Pendulum',
    category: 'Mechanics',
    description: 'Nonlinear coupled chaotic double pendulum integrated via 4th-order Runge-Kutta with trajectory trail visualization.',
    iconName: 'Shuffle',
    badge: 'Chaos'
  },

  // Waves
  {
    id: 'wave-sim',
    name: 'Wave Equation & Interference',
    category: 'Waves',
    description: 'Interactive transverse wave visualizer supporting wave propagation, standing wave harmonics, and dual-source wave interference.',
    iconName: 'Radio',
    badge: 'Simulation'
  },

  // Quantum
  {
    id: 'quantum-suite',
    name: 'Quantum Physics Suite',
    category: 'Quantum',
    description: 'Interactive suite for Photoelectric Effect, Blackbody radiation spectral curves, Hydrogen Bohr emission lines, and de Broglie matter waves.',
    iconName: 'Atom',
    badge: 'Quantum'
  },

  // Data Analysis
  {
    id: 'plotter',
    name: 'Scientific Function Plotter',
    category: 'Data Analysis',
    description: 'In-browser multi-function graphing engine (y = f(x)) with zoom, pan, coordinate crosshair inspection, and export options.',
    iconName: 'TrendingUp',
    badge: 'Analysis'
  },
  {
    id: 'data-analyzer',
    name: 'Experimental Data & Curve Fitting',
    category: 'Data Analysis',
    description: 'Upload CSV/TXT datasets or load laboratory experiments to perform linear, polynomial, and exponential regression fits with R² statistics.',
    iconName: 'FileSpreadsheet',
    badge: 'Lab Tool'
  },

  // Utilities
  {
    id: 'unit-converter',
    name: 'Scientific Unit Converter',
    category: 'Utilities',
    description: 'High-precision converter across 20 scientific domains with scientific notation support and direct clipboard copying.',
    iconName: 'ArrowLeftRight',
    badge: 'Utility'
  },
  {
    id: 'constants-db',
    name: 'Physical Constants Database',
    category: 'Utilities',
    description: 'Searchable CODATA database of fundamental physical constants with values, exact SI units, uncertainties, and LaTeX symbols.',
    iconName: 'Database',
    badge: 'Reference'
  },
  {
    id: 'formula-explorer',
    name: 'Physics Formula Explorer',
    category: 'Utilities',
    description: 'Comprehensive formula catalog with LaTeX typography, algebraic rearrangements, worked problems, and quick calculator jumps.',
    iconName: 'BookOpen',
    badge: 'Reference'
  }
];
