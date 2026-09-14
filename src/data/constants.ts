import { PhysicalConstant } from '../types';

export const PHYSICAL_CONSTANTS: PhysicalConstant[] = [
  {
    name: 'Speed of Light in Vacuum',
    symbol: 'c',
    latexSymbol: 'c',
    value: '299 792 458',
    numericValue: 299792458,
    uncertainty: 'Exact (defined)',
    unit: 'm s⁻¹',
    category: 'Fundamental',
    description: 'The maximum speed at which conventional matter and information can travel in spacetime.'
  },
  {
    name: 'Planck Constant',
    symbol: 'h',
    latexSymbol: 'h',
    value: '6.626 070 15 × 10⁻³⁴',
    numericValue: 6.62607015e-34,
    uncertainty: 'Exact (SI definition)',
    unit: 'J s',
    category: 'Fundamental',
    description: 'Fundamental quantum of action relating photon energy to electromagnetic wave frequency (E = hν).'
  },
  {
    name: 'Reduced Planck Constant (Dirac constant)',
    symbol: 'ħ',
    latexSymbol: '\\hbar = \\frac{h}{2\\pi}',
    value: '1.054 571 817 × 10⁻³⁴',
    numericValue: 1.054571817e-34,
    uncertainty: 'Exact',
    unit: 'J s',
    category: 'Fundamental',
    description: 'Appears extensively in quantum mechanics, Schrödinger equation, and angular momentum commutation.'
  },
  {
    name: 'Elementary Charge',
    symbol: 'e',
    latexSymbol: 'e',
    value: '1.602 176 634 × 10⁻¹⁹',
    numericValue: 1.602176634e-19,
    uncertainty: 'Exact (SI definition)',
    unit: 'C',
    category: 'Electromagnetic',
    description: 'Electric charge carried by a single proton or the magnitude of negative charge carried by an electron.'
  },
  {
    name: 'Boltzmann Constant',
    symbol: 'k_B',
    latexSymbol: 'k_B',
    value: '1.380 649 × 10⁻²³',
    numericValue: 1.380649e-23,
    uncertainty: 'Exact (SI definition)',
    unit: 'J K⁻¹',
    category: 'Thermodynamics',
    description: 'Relates average relative thermal kinetic energy of particles in a gas with thermodynamic temperature.'
  },
  {
    name: 'Newtonian Gravitational Constant',
    symbol: 'G',
    latexSymbol: 'G',
    value: '6.674 30 × 10⁻¹¹',
    numericValue: 6.6743e-11,
    uncertainty: '± 0.000 15 × 10⁻¹¹ (CODATA 2018)',
    unit: 'm³ kg⁻¹ s⁻²',
    category: 'Fundamental',
    description: 'Key empirical proportionality factor in Newton\'s law of universal gravitation and Einstein field equations.'
  },
  {
    name: 'Electron Rest Mass',
    symbol: 'm_e',
    latexSymbol: 'm_e',
    value: '9.109 383 7015 × 10⁻³¹',
    numericValue: 9.1093837015e-31,
    uncertainty: '± 0.000 000 0028 × 10⁻³¹',
    unit: 'kg',
    category: 'Atomic & Nuclear',
    description: 'Stationary invariant mass of an electron (~ 0.510 998 95 MeV/c²).'
  },
  {
    name: 'Proton Rest Mass',
    symbol: 'm_p',
    latexSymbol: 'm_p',
    value: '1.672 621 923 69 × 10⁻²⁷',
    numericValue: 1.67262192369e-27,
    uncertainty: '± 0.000 000 000 51 × 10⁻²⁷',
    unit: 'kg',
    category: 'Atomic & Nuclear',
    description: 'Invariant mass of a proton (~ 938.272 088 MeV/c²).'
  },
  {
    name: 'Vacuum Electric Permittivity',
    symbol: 'ε₀',
    latexSymbol: '\\varepsilon_0',
    value: '8.854 187 8128 × 10⁻¹²',
    numericValue: 8.8541878128e-12,
    uncertainty: '± 0.000 000 0013 × 10⁻¹²',
    unit: 'F m⁻¹',
    category: 'Electromagnetic',
    description: 'Physical constant representing the capability of classical vacuum to permit electric field lines.'
  },
  {
    name: 'Vacuum Magnetic Permeability',
    symbol: 'μ₀',
    latexSymbol: '\\mu_0',
    value: '1.256 637 062 12 × 10⁻⁶',
    numericValue: 1.25663706212e-6,
    uncertainty: '± 0.000 000 000 19 × 10⁻⁶',
    unit: 'N A⁻²',
    category: 'Electromagnetic',
    description: 'Magnetic constant connected with ε₀ through the relation 1/(ε₀μ₀) = c².'
  },
  {
    name: 'Avogadro Constant',
    symbol: 'N_A',
    latexSymbol: 'N_A',
    value: '6.022 140 76 × 10²³',
    numericValue: 6.02214076e23,
    uncertainty: 'Exact (SI definition)',
    unit: 'mol⁻¹',
    category: 'Thermodynamics',
    description: 'Number of constituent particles per mole of a given substance.'
  },
  {
    name: 'Bohr Radius',
    symbol: 'a₀',
    latexSymbol: 'a_0 = \\frac{4\\pi\\varepsilon_0\\hbar^2}{m_e e^2}',
    value: '5.291 772 109 03 × 10⁻¹¹',
    numericValue: 5.29177210903e-11,
    uncertainty: '± 0.000 000 000 80 × 10⁻¹¹',
    unit: 'm',
    category: 'Atomic & Nuclear',
    description: 'Most probable distance between the nucleus and the electron in a ground-state hydrogen atom.'
  },
  {
    name: 'Rydberg Constant',
    symbol: 'R_∞',
    latexSymbol: 'R_\\infty',
    value: '10 973 731.568 160',
    numericValue: 10973731.56816,
    uncertainty: '± 0.000 021',
    unit: 'm⁻¹',
    category: 'Atomic & Nuclear',
    description: 'Fundamental spectral constant limiting wavenumber of photons emitted in atomic hydrogen transitions.'
  },
  {
    name: 'Stefan-Boltzmann Constant',
    symbol: 'σ',
    latexSymbol: '\\sigma = \\frac{2\\pi^5 k_B^4}{15 c^2 h^3}',
    value: '5.670 374 419 × 10⁻⁸',
    numericValue: 5.670374419e-8,
    uncertainty: 'Exact',
    unit: 'W m⁻² K⁻⁴',
    category: 'Thermodynamics',
    description: 'Proportionality factor relating total power emitted per unit area of a black body to the fourth power of temperature.'
  },
  {
    name: 'Wien Displacement Law Constant',
    symbol: 'b',
    latexSymbol: 'b = \\lambda_{\\text{max}} T',
    value: '2.897 771 955 × 10⁻³',
    numericValue: 2.897771955e-3,
    uncertainty: 'Exact',
    unit: 'm K',
    category: 'Thermodynamics',
    description: 'Relates the temperature of a blackbody to the wavelength at which spectral radiance attains its maximum.'
  }
];
