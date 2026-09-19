import { Note } from '../types';

/**
 * =====================================================================
 * PHYSICS NOTES LIBRARY DATA
 * =====================================================================
 * 
 * HOW TO ADD A NEW NOTE:
 * ---------------------------------------------------------------------
 * Step 1:
 *   Put your PDF file inside:
 *     public/notes/pdf/your-file-name.pdf
 * 
 * Step 2:
 *   Add one new entry to the NOTES_DATA list below:
 *     {
 *       id: 'quantum-mechanics-01',
 *       title: 'Quantum Mechanics — Introduction',
 *       subject: 'Quantum Mechanics',
 *       topic: 'Beginning of Quantum Mechanics',
 *       description: 'Introductory notes covering fundamental concepts...',
 *       date: '2026-09-19', // Optional
 *       pdfUrl: '/notes/pdf/quantum-mechanics-01.pdf'
 *     }
 * 
 * That's it! The website will automatically display the new note in the
 * library, search, filters, and in-browser PDF reader.
 * =====================================================================
 */

export const NOTES_DATA: Note[] = [
  {
    id: 'quantum-mechanics-01',
    title: 'Quantum Mechanics — Introduction',
    subject: 'Quantum Mechanics',
    category: 'Quantum Mechanics',
    topic: 'Beginning of Quantum Mechanics',
    description:
      'Introductory notes covering the breakdown of classical radiation physics, Planck\'s energy quantization hypothesis, Einstein\'s photoelectric effect, and de Broglie matter waves.',
    summary:
      'Introductory notes covering the breakdown of classical radiation physics, Planck\'s energy quantization hypothesis, Einstein\'s photoelectric effect, and de Broglie matter waves.',
    date: '2026-09-19',
    pdfUrl: '/notes/pdf/quantum-mechanics-01.pdf'
  },
  {
    id: 'quantum-chemistry-01',
    title: 'Quantum Chemistry — Molecular Orbitals',
    subject: 'Quantum Chemistry',
    category: 'Quantum Chemistry',
    topic: 'Molecular Orbitals & Born-Oppenheimer Approximation',
    description:
      'Foundational notes on the molecular Hamiltonian, the Born-Oppenheimer separation of nuclear and electronic motion, and LCAO molecular orbital theory.',
    summary:
      'Foundational notes on the molecular Hamiltonian, the Born-Oppenheimer separation of nuclear and electronic motion, and LCAO molecular orbital theory.',
    date: '2026-09-19',
    pdfUrl: '/notes/pdf/quantum-chemistry-01.pdf'
  },
  {
    id: 'classical-mechanics-01',
    title: 'Classical Mechanics — Lagrangian Dynamics',
    subject: 'Classical Mechanics',
    category: 'Classical Mechanics',
    topic: 'Principle of Least Action & Euler-Lagrange Equations',
    description:
      'Study notes formulating mechanics through generalized coordinates, stationary action principle, and constrained system dynamics via Euler-Lagrange equations.',
    summary:
      'Study notes formulating mechanics through generalized coordinates, stationary action principle, and constrained system dynamics via Euler-Lagrange equations.',
    date: '2026-09-19',
    pdfUrl: '/notes/pdf/classical-mechanics-01.pdf'
  },
  {
    id: 'electromagnetism-01',
    title: 'Electromagnetism — Maxwell\'s Equations',
    subject: 'Electromagnetism',
    category: 'Electromagnetism',
    topic: 'Unified Vector Field Theory & Electromagnetic Waves',
    description:
      'Mathematical derivation of electromagnetic wave propagation in vacuum from Maxwell\'s four differential equations, including displacement current and the speed of light.',
    summary:
      'Mathematical derivation of electromagnetic wave propagation in vacuum from Maxwell\'s four differential equations, including displacement current and the speed of light.',
    date: '2026-09-19',
    pdfUrl: '/notes/pdf/electromagnetism-01.pdf'
  }
];
