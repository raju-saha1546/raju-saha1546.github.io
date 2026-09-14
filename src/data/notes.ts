import { Note } from '../types';

export const NOTES_DATA: Note[] = [
  {
    id: 'blackbody-radiation',
    title: "Black-Body Radiation & Planck's Quantum Hypothesis",
    category: 'Quantum Mechanics',
    date: '10 Feb 2026',
    readTime: '7 min read',
    summary: 'The ultraviolet catastrophe of classical Rayleigh-Jeans electrodynamics, the equipartition theorem failure, and Max Planck\'s revolutionary quantization of harmonic oscillator energy packets.',
    keyEquation: 'u(\\nu, T) = \\frac{8\\pi h\\nu^3}{c^3} \\frac{1}{e^{h\\nu / k_B T} - 1}',
    relatedTools: ['quantum', 'plotter'],
    references: [
      'Planck, M. (1900). "Ueber eine Verbesserung der Wien\'schen Spectralgleichung". Verhandlungen der Deutschen Physikalischen Gesellschaft.',
      'Eisberg, R., & Resnick, R. (1985). Quantum Physics of Atoms, Molecules, Solids, Nuclei, and Particles.'
    ],
    sections: [
      {
        id: 'classical-failure',
        title: '1. The Classical Dilemma: The Ultraviolet Catastrophe',
        content: 'In classical statistical mechanics, electromagnetic radiation enclosed in an isothermal cavity of temperature T is treated as a superposition of standing electromagnetic waves. By the classical equipartition theorem, each spatial oscillation mode possesses an average thermal kinetic and potential energy equal to k_B T.',
        latex: '\\bar{\\varepsilon}_{\\text{classical}} = k_B T',
        derivationSteps: [
          {
            step: 'Mode density in 3D cavity',
            explanation: 'Counting standing wave solutions inside a cube of volume V = L³ with conducting walls gives the number of modes per unit frequency interval:',
            latex: 'g(\\nu)\\, d\\nu = \\frac{8\\pi \\nu^2}{c^3}\\, d\\nu'
          },
          {
            step: 'Rayleigh-Jeans Spectral Energy Density',
            explanation: 'Multiplying mode density by the classical average energy per mode gives the Rayleigh-Jeans distribution:',
            latex: 'u(\\nu, T)\\, d\\nu = g(\\nu) \\bar{\\varepsilon}\\, d\\nu = \\frac{8\\pi \\nu^2}{c^3} k_B T\\, d\\nu'
          },
          {
            step: 'Ultraviolet Divergence',
            explanation: 'Integrating total energy density over all frequencies yields infinity: as frequency approaches infinity, classical theory catastrophically predicts infinite total radiant energy:',
            latex: 'U_{\\text{total}} = \\int_0^\\infty \\frac{8\\pi k_B T}{c^3} \\nu^2\\, d\\nu \\to \\infty'
          }
        ]
      },
      {
        id: 'plancks-postulate',
        title: "2. Planck's Quantum Postulate and Derivation",
        content: 'In October 1900, Max Planck introduced an ad hoc postulate: the atomic oscillators in the cavity walls cannot emit or absorb energy continuously. Instead, energy exchanges occur exclusively in discrete packets ("quanta") proportional to the radiation frequency.',
        latex: 'E_n = n h \\nu, \\quad n \\in \\{0, 1, 2, 3, \\dots\\}',
        derivationSteps: [
          {
            step: 'Boltzmann statistical average over discrete states',
            explanation: 'Using canonical ensemble Boltzmann probabilities P(E_n) = e^{-E_n / k_B T} / Z where partition function Z = \\sum_{n=0}^\\infty e^{-n h\\nu / k_B T}:',
            latex: '\\bar{\\varepsilon} = \\frac{\\sum_{n=0}^\\infty n h\\nu e^{-n h\\nu / k_B T}}{\\sum_{n=0}^\\infty e^{-n h\\nu / k_B T}}'
          },
          {
            step: 'Geometric series summation',
            explanation: 'Letting x = h\\nu / k_B T, the denominator is 1/(1 - e^{-x}) and the numerator is -h\\nu d/dx [\\sum e^{-nx}]. This yields the quantum average energy per mode:',
            latex: '\\bar{\\varepsilon}_{\\text{quantum}} = \\frac{h\\nu}{e^{\\frac{h\\nu}{k_B T}} - 1}'
          },
          {
            step: "Planck's Radiation Formula",
            explanation: 'Multiplying mode density by this quantum average energy produces the complete Planck distribution without ultraviolet divergence:',
            latex: 'u(\\nu, T) = \\frac{8\\pi h\\nu^3}{c^3} \\frac{1}{e^{\\frac{h\\nu}{k_B T}} - 1}'
          }
        ]
      },
      {
        id: 'limits',
        title: '3. Limiting Cases: Wien & Rayleigh-Jeans Asymptotes',
        content: 'In the high-frequency limit (hν >> k_B T), the exponential dominates, recovering Wien\'s empirical distribution. In the low-frequency limit (hν << k_B T), expanding e^{hν/k_B T} ≈ 1 + hν/k_B T smoothly recovers the classical Rayleigh-Jeans formula, satisfying Bohr\'s correspondence principle.',
        latex: '\\lim_{h\\nu / k_B T \\to 0} u(\\nu, T) = \\frac{8\\pi h\\nu^3}{c^3} \\frac{1}{1 + \\frac{h\\nu}{k_B T} - 1} = \\frac{8\\pi \\nu^2}{c^3} k_B T'
      }
    ]
  },
  {
    id: 'photoelectric-effect-note',
    title: "Photoelectric Effect & Einstein's Light Quantum",
    category: 'Quantum Mechanics',
    date: '18 Feb 2026',
    readTime: '6 min read',
    summary: 'The failure of the classical wave theory of light to explain instantaneous photoelectron emission, the frequency threshold, and Albert Einstein\'s Nobel-winning heuristic.',
    keyEquation: 'K_{\\text{max}} = h\\nu - \\Phi = e V_0',
    relatedTools: ['quantum', 'constants'],
    references: [
      'Einstein, A. (1905). "Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt". Annalen der Physik.',
      'Millikan, R. A. (1916). "A Direct Photoelectric Determination of Planck\'s h". Physical Review.'
    ],
    sections: [
      {
        id: 'wave-contradictions',
        title: '1. Why Classical Wave Optics Failed',
        content: 'Under Maxwell\'s classical wave optics, the energy carried by light is distributed continuously across its wavefront, with intensity proportional to the electric field amplitude squared (I ∝ |E|²). Classical theory made three clear predictions that directly contradicted experimental observations:\n1. Emission delay: electrons should require measurable time (minutes to hours at low intensity) to soak up sufficient surface energy.\n2. Kinetic energy should increase with light intensity.\n3. Any frequency of light should cause emission if intensity is high enough.',
        latex: 'I = \\frac{1}{2} c \\varepsilon_0 |E|^2'
      },
      {
        id: 'einstein-derivation',
        title: "2. Einstein's Photon Energy Balance",
        content: 'In 1905, Einstein proposed that light propagates and exchanges energy as localized bundles of energy E = hν. An electron in a metal absorbs either an entire photon or nothing at all.',
        derivationSteps: [
          {
            step: 'Single-photon energy absorption',
            explanation: 'The energy imparted to a single conduction electron by a photon of frequency ν is exactly E = hν.',
            latex: 'E_{\\text{absorbed}} = h\\nu'
          },
          {
            step: 'Overcoming surface binding energy (Work Function)',
            explanation: 'Part of this energy is expended overcoming the lattice potential barrier Φ (the work function). The remaining energy constitutes maximum outward kinetic energy:',
            latex: 'K_{\\text{max}} = h\\nu - \\Phi'
          },
          {
            step: 'Threshold condition & Stopping potential',
            explanation: 'Emission requires K_max ≥ 0, establishing an immediate threshold frequency ν₀ = Φ / h below which no emission occurs regardless of intensity. Measuring retarding potential V₀ gives:',
            latex: 'V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi}{e}'
          }
        ]
      }
    ]
  },
  {
    id: 'matter-waves-schrodinger',
    title: "Matter Waves & The Schrödinger Wave Equation",
    category: 'Quantum Mechanics',
    date: '28 Feb 2026',
    readTime: '9 min read',
    summary: 'De Broglie\'s wave-particle hypothesis, dispersion relations, wavepacket phase vs group velocities, and Erwin Schrödinger\'s wave equation for stationary states.',
    keyEquation: 'i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\left( -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}) \\right) \\psi',
    relatedTools: ['quantum', 'projectile'],
    references: [
      'De Broglie, L. (1924). "Recherches sur la théorie des quanta". PhD thesis.',
      'Schrödinger, E. (1926). "Quantisierung als Eigenwertproblem". Annalen der Physik.'
    ],
    sections: [
      {
        id: 'matter-wave-hypothesis',
        title: '1. De Broglie Matter Waves',
        content: 'Louis de Broglie reasoned that if light waves exhibit corpuscular (particle-like) traits with momentum p = h/λ, nature\'s symmetry suggests material particles must similarly possess wave characteristics.',
        latex: '\\lambda = \\frac{h}{p}, \\quad \\mathbf{p} = \\hbar \\mathbf{k}'
      },
      {
        id: 'schrodinger-construction',
        title: '2. Heuristic Construction of the Wave Equation',
        content: 'For a non-relativistic free particle of mass m, total energy equals kinetic energy E = p² / (2m). In a plane matter wave ψ(x,t) = e^{i(kx - ωt)}, differential operators extract physical observables.',
        derivationSteps: [
          {
            step: 'Energy and Momentum Operators',
            explanation: 'Taking spatial and temporal derivatives of the plane wave identifies observable quantum operators:',
            latex: '\\hat{E} = i\\hbar \\frac{\\partial}{\\partial t}, \\quad \\hat{p} = -i\\hbar \\frac{\\partial}{\\partial x}'
          },
          {
            step: 'Operator form of classical Hamiltonian',
            explanation: 'Substituting operator equivalents into the non-relativistic total energy expression E = p² / 2m + V(x):',
            latex: '\\hat{E}\\psi = \\left( \\frac{\\hat{p}^2}{2m} + V(x) \\right) \\psi'
          },
          {
            step: '1D Time-Dependent Schrödinger Equation',
            explanation: 'Evaluating the second spatial derivative yields Schrödinger\'s celebrated fundamental equation of non-relativistic quantum physics:',
            latex: 'i\\hbar \\frac{\\partial \\psi(x,t)}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2 \\psi(x,t)}{\\partial x^2} + V(x)\\psi(x,t)'
          }
        ]
      }
    ]
  },
  {
    id: 'maxwell-equations',
    title: "Maxwell's Equations & Electromagnetic Wave Propagation",
    category: 'Electromagnetism',
    date: '03 Mar 2026',
    readTime: '8 min read',
    summary: 'The unified vector formulation of classical electromagnetism in vacuum, the displacement current correction, and the wave equation revealing light as an electromagnetic disturbance.',
    keyEquation: '\\nabla^2 \\mathbf{E} - \\mu_0\\varepsilon_0 \\frac{\\partial^2 \\mathbf{E}}{\\partial t^2} = 0, \\quad c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}',
    relatedTools: ['constants', 'waves'],
    references: [
      'Maxwell, J. C. (1865). "A Dynamical Theory of the Electromagnetic Field". Philosophical Transactions of the Royal Society of London.',
      'Griffiths, D. J. (2017). Introduction to Electrodynamics (4th ed.). Cambridge University Press.'
    ],
    sections: [
      {
        id: 'differential-form',
        title: "1. Maxwell's Equations in Vacuum",
        content: 'In vacuum devoid of free charges (ρ = 0) and conduction currents (J = 0), Maxwell\'s four coupled partial differential equations govern electric (E) and magnetic (B) vector fields:',
        latex: '\\begin{aligned} \\nabla \\cdot \\mathbf{E} &= 0 \\\\ \\nabla \\cdot \\mathbf{B} &= 0 \\\\ \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ \\nabla \\times \\mathbf{B} &= \\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t} \\end{aligned}'
      },
      {
        id: 'wave-equation-derivation',
        title: '2. Derivation of the Electromagnetic Wave Equation',
        content: 'Taking the curl of Faraday\'s law (curl E) and decoupling the magnetic field vector yields the wave equation:',
        derivationSteps: [
          {
            step: 'Vector identity for curl of curl',
            explanation: 'Applying the standard vector Laplacian identity ∇ × (∇ × A) = ∇(∇ · A) - ∇²A to the electric field:',
            latex: '\\nabla \\times (\\nabla \\times \\mathbf{E}) = \\nabla(\\nabla \\cdot \\mathbf{E}) - \\nabla^2 \\mathbf{E}'
          },
          {
            step: 'Substituting Gauss\'s Law and Ampère-Maxwell Law',
            explanation: 'Since ∇ · E = 0 in charge-free space, the first term vanishes. Using Faraday\'s law on the left side and substituting Maxwell\'s displacement current on the right:',
            latex: '-\\nabla^2 \\mathbf{E} = \\nabla \\times \\left( -\\frac{\\partial \\mathbf{B}}{\\partial t} \\right) = -\\frac{\\partial}{\\partial t}(\\nabla \\times \\mathbf{B}) = -\\mu_0\\varepsilon_0 \\frac{\\partial^2 \\mathbf{E}}{\\partial t^2}'
          },
          {
            step: 'Standard 3D Wave Equation & Speed of Light',
            explanation: 'Rearranging gives the wave equation propagating at speed c = 1 / √(μ₀ε₀):',
            latex: '\\nabla^2 \\mathbf{E} = \\mu_0\\varepsilon_0 \\frac{\\partial^2 \\mathbf{E}}{\\partial t^2} \\implies c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\approx 2.998 \\times 10^8 \\text{ m/s}'
          }
        ]
      }
    ]
  },
  {
    id: 'lagrangian-mechanics',
    title: "Lagrangian Mechanics & The Principle of Least Action",
    category: 'Classical Mechanics',
    date: '08 Mar 2026',
    readTime: '8 min read',
    summary: 'Reformulating Newtonian mechanics via generalized coordinates, d\'Alembert\'s principle, Hamilton\'s stationary action principle, and Euler-Lagrange equations.',
    keyEquation: '\\frac{d}{dt}\\left( \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}_j} \\right) - \\frac{\\partial \\mathcal{L}}{\\partial q_j} = 0, \\quad \\mathcal{L} = T - V',
    relatedTools: ['projectile', 'plotter'],
    references: [
      'Lagrange, J.-L. (1788). Mécanique Analytique.',
      'Goldstein, H., Poole, C., & Safko, J. (2002). Classical Mechanics (3rd ed.).'
    ],
    sections: [
      {
        id: 'principle-of-least-action',
        title: "1. Hamilton's Principle of Stationary Action",
        content: 'The actual physical trajectory taken by a dynamic system between fixed boundary states (t₁, q₁) and (t₂, q₂) is one for which the action functional S is stationary (δS = 0).',
        latex: 'S[q(t)] = \\int_{t_1}^{t_2} \\mathcal{L}(q, \\dot{q}, t)\\, dt, \\quad \\delta S = 0'
      },
      {
        id: 'euler-lagrange-derivation',
        title: '2. Derivation of the Euler-Lagrange Equations',
        content: 'Consider an arbitrary virtual variation η(t) vanishing at endpoints (η(t₁) = η(t₂) = 0).',
        derivationSteps: [
          {
            step: 'Variation of the action functional',
            explanation: 'Perturbing the path q(t, α) = q(t) + α η(t) and taking derivative with respect to α:',
            latex: '\\delta S = \\int_{t_1}^{t_2} \\left( \\frac{\\partial \\mathcal{L}}{\\partial q} \\eta(t) + \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}} \\dot{\\eta}(t) \\right) dt = 0'
          },
          {
            step: 'Integration by parts of the velocity derivative term',
            explanation: 'Integrating the second term by parts isolates the arbitrary variation η(t):',
            latex: '\\int_{t_1}^{t_2} \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}} \\dot{\\eta}(t) dt = \\left[ \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}} \\eta(t) \\right]_{t_1}^{t_2} - \\int_{t_1}^{t_2} \\frac{d}{dt}\\left( \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}} \\right) \\eta(t) dt'
          },
          {
            step: 'Fundamental Lemma of Calculus of Variations',
            explanation: 'Because the boundary terms vanish and η(t) is completely arbitrary inside the interval, the integrand must vanish identically:',
            latex: '\\frac{d}{dt}\\left( \\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}_j} \\right) - \\frac{\\partial \\mathcal{L}}{\\partial q_j} = 0'
          }
        ]
      }
    ]
  },
  {
    id: 'born-oppenheimer',
    title: 'The Born-Oppenheimer Approximation & Molecular Orbitals',
    category: 'Quantum Chemistry',
    date: '12 Mar 2026',
    readTime: '6 min read',
    summary: 'Decoupling electronic and nuclear motion based on the mass disparity m_e / M_n ≪ 1, creating adiabatic potential energy surfaces for chemical bonds.',
    keyEquation: '\\hat{H}_{\\text{total}} = \\hat{T}_n + \\hat{T}_e + \\hat{V}_{en} + \\hat{V}_{ee} + \\hat{V}_{nn}',
    relatedTools: ['constants', 'plotter'],
    references: [
      'Born, M., & Oppenheimer, R. (1927). Zur Quantentheorie der Molekeln. Annalen der Physik.',
      'Szabo, A., & Ostlund, N. S. (1996). Modern Quantum Chemistry.'
    ],
    sections: [
      {
        id: 'bo-mass-ratio',
        title: '1. Nuclear vs. Electronic Time Scales',
        content: 'Because atomic nuclei are at least 1,836 times more massive than electrons (M_proton / m_e ≈ 1836), electrons adjust their quantum distribution almost instantaneously to any nuclear repositioning.',
        latex: '\\frac{m_e}{M_{\\text{nucleus}}} \\le \\frac{1}{1836} \\ll 1',
        derivationSteps: [
          {
            step: 'Clamped-Nuclei Hamiltonian',
            explanation: 'Treating nuclear positions R as fixed classical parameters, the electronic Hamiltonian simplifies to:',
            latex: '\\hat{H}_e = -\\sum_i \\frac{\\hbar^2}{2m_e}\\nabla_i^2 - \\sum_{i,A} \\frac{Z_A e^2}{4\\pi\\varepsilon_0 r_{iA}} + \\sum_{i<j} \\frac{e^2}{4\\pi\\varepsilon_0 r_{ij}}'
          },
          {
            step: 'Adiabatic Potential Energy Surface',
            explanation: 'The eigenvalues E_e(R) plus nuclear Coulomb repulsion V_{nn}(R) define the effective potential in which nuclei vibrate and rotate:',
            latex: 'V_{\\text{eff}}(R) = E_e(R) + \\sum_{A<B} \\frac{Z_A Z_B e^2}{4\\pi\\varepsilon_0 R_{AB}}'
          }
        ]
      }
    ]
  },
  {
    id: 'crank-nicolson-pde',
    title: 'Finite-Difference Discretization: The Crank-Nicolson Scheme',
    category: 'Computational Physics',
    date: '15 Mar 2026',
    readTime: '7 min read',
    summary: 'Formulating unconditionally stable, norm-preserving implicit time integration for parabolic and Schrödinger partial differential equations.',
    keyEquation: '\\left( \\mathbf{I} + \\frac{i\\Delta t}{2\\hbar}\\mathbf{H} \\right) \\Psi^{n+1} = \\left( \\mathbf{I} - \\frac{i\\Delta t}{2\\hbar}\\mathbf{H} \\right) \\Psi^n',
    relatedTools: ['plotter', 'data-analysis'],
    references: [
      'Crank, J., & Nicolson, P. (1947). A practical method for numerical evaluation of solutions of partial differential equations of the heat-conduction type.',
      'Press, W. H. et al. (2007). Numerical Recipes: The Art of Scientific Computing.'
    ],
    sections: [
      {
        id: 'stability-comparison',
        title: '1. Explicit vs. Implicit Discretization',
        content: 'Standard forward-time centered-space (FTCS) explicit schemes are numerically unstable for the Schrödinger equation. Crank-Nicolson averages forward and backward time steps at half-integer step n + 1/2, yielding unconditional numerical stability and exact unitarity.',
        latex: '\\frac{\\Psi^{n+1} - \\Psi^n}{\\Delta t} = -\\frac{i}{\\hbar}\\mathbf{H}\\left( \\frac{\\Psi^{n+1} + \\Psi^n}{2} \\right)'
      }
    ]
  }
];
