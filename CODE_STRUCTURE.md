# Code Structure & Architecture Guide

This guide explains how files and directories are organized in this project. Everything is kept flat, predictable, and modular.

---

## Directory Overview

```
src/
├── components/          # Reusable UI elements (Navbar, Footer, Modals)
│   ├── CommandPalette.tsx     # Global quick-search dialog
│   ├── Footer.tsx             # Global bottom footer
│   ├── MathView.tsx           # KaTeX equation renderer component
│   ├── Navbar.tsx             # Sticky top navigation bar
│   └── ProjectDetailModal.tsx # Full-screen project case study modal
│
├── pages/               # Top-level screen views (one file per page)
│   ├── About.tsx              # Academic background & philosophy
│   ├── Contact.tsx            # Contact form & correspondence details
│   ├── Home.tsx               # Homepage with personal hero, previews & canvas
│   ├── Journey.tsx            # Timeline of coursework and milestones
│   ├── Lab.tsx                # Laboratory notebook & experiment logs
│   ├── Notes.tsx              # Theory notes with derivations & steps
│   ├── Projects.tsx           # Filterable catalog of academic projects
│   └── Tools.tsx              # Unified platform for Physics Tools & Simulations
│
├── tools/               # Physics calculators & data analysis utilities
│   ├── DataAnalysisTool.tsx          # CSV curve fitting & least-squares regression
│   ├── ElectronicsSimulator.tsx      # DC circuit analyzer with live LED visualization
│   ├── FormulaExplorer.tsx           # Formula reference explorer with worked examples
│   ├── OhmsLawCalculator.tsx         # Ohm's law & electrical power solver
│   ├── PhysicalConstantsExplorer.tsx # CODATA physical constants lookup
│   ├── ResistorCalculator.tsx        # 4 & 5-band color code resistance calculator
│   ├── ScientificPlotter.tsx         # Multi-curve math function grapher
│   └── UnitConverter.tsx             # Physical SI unit converter
│
├── simulations/         # Interactive canvas-based physics simulations
│   ├── DoublePendulumSimulation.tsx    # Chaotic double pendulum with Lyapunov trails
│   ├── ElectricFieldSimulation.tsx     # Coulomb electric field & potential vectors
│   ├── HarmonicOscillatorSimulation.tsx# Damped & driven oscillator with phase portrait
│   ├── ProjectileSimulation.tsx        # 2D kinematics with aerodynamic drag
│   └── WaveInterferenceSimulation.tsx  # Double-slit optical interference & diffraction
│
├── data/                # Plain TypeScript objects containing all personal content
│   ├── constants.ts     # Physical constants database (CODATA)
│   ├── formulas.ts      # Physics formulas, variables, and derivations
│   ├── labNotebook.ts   # Lab experiments, hypothesis, data points & error analysis
│   ├── notes.ts         # Theoretical writeups and step-by-step math derivations
│   ├── personal.ts      # Bio, tagline, focus areas, roadmap milestones
│   └── projects.ts      # In-depth project case studies (theory, math, code)
│
├── App.tsx              # Main application shell & URL routing synchronization
├── index.css            # Tailwind styles and global CSS theme variables
├── main.tsx             # React entry point
└── types.ts             # Shared TypeScript interfaces & types
```

---

## Architectural Rules

1. **Direct Data Editing**: UI components import data arrays from `src/data/`. Never embed hardcoded lists or profile paragraphs deep inside a component.
2. **Self-Contained Simulations**: Every simulation in `src/simulations/` manages its own canvas loop, controls, and physics calculations.
3. **No Unnecessary Abstraction**: Simple formulas like $V = I \times R$ are computed directly inside their tool components.
4. **Clean Routing**: `App.tsx` handles top-level tabs (`home`, `about`, `journey`, `projects`, `notes`, `lab`, `tools`, `contact`) and synchronizes with URL hashes (`#projects`, `#tools/projectile`) so browser Back and Forward navigation work out of the box.
