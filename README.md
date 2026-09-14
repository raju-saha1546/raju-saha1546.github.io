# Raju — Personal Physics Portfolio & Physics Lab

Welcome to Raju's personal physics portfolio and digital laboratory. This website showcases academic reflections, notes, experimental logs, interactive physics tools, and computational simulations.

The site is built with **React**, **Vite**, and **Tailwind CSS**, designed with an intuitive, flat architecture that is straightforward to navigate and maintain.

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
This outputs production files to the `dist/` directory and creates `dist/404.html` for GitHub Pages single-page routing.

---

## Where to Edit Content (Beginner Cheat Sheet)

| What You Want to Do | File to Open |
| :--- | :--- |
| **Change your name, bio, focus areas, contact links** | `src/data/personal.ts` |
| **Add or edit projects (theory, results, writeups)** | `src/data/projects.ts` |
| **Add or edit physics notes & derivations** | `src/data/notes.ts` |
| **Add or edit lab experiments & error logs** | `src/data/labNotebook.ts` |
| **Add or edit physics formulas** | `src/data/formulas.ts` |
| **Add or edit physical constants** | `src/data/constants.ts` |
| **Modify the homepage sections** | `src/pages/Home.tsx` |
| **Modify the navbar or links** | `src/components/Navbar.tsx` |
| **Modify the footer** | `src/components/Footer.tsx` |
| **Modify global colors or styles** | `src/index.css` |

---

## How to Add New Features

### Adding a New Physics Tool
1. Create a new component in `src/tools/` (e.g. `src/tools/MyNewTool.tsx`).
2. Open `src/pages/Tools.tsx`:
   - Import your component at the top:
     ```tsx
     import MyNewTool from '../tools/MyNewTool';
     ```
   - Add your tool definition to the `toolsAndSims` array:
     ```tsx
     {
       id: 'my-new-tool',
       type: 'tool',
       name: 'My New Tool Name',
       category: 'Electronics', // or 'Mechanics', 'Utilities', etc.
       icon: Cpu,
       personalDesc: 'Short description of what this tool does.'
     }
     ```
   - Render it inside the switch area:
     ```tsx
     {activeItem === 'my-new-tool' && <MyNewTool />}
     ```
3. Done! It automatically appears in the tools list and command search palette.

### Adding a New Physics Simulation
1. Create your simulation in `src/simulations/` (e.g. `src/simulations/MySimulation.tsx`).
2. Register it in `src/pages/Tools.tsx` under the `toolsAndSims` list.

---

## How Deployment Works

This site is deployed to **GitHub Pages User Site** at:
`https://raju-saha1546.github.io/`

The deployment pipeline is located in `.github/workflows/deploy.yml`:
- Triggered automatically on push to the `main` branch.
- Runs `npm ci` and `npm run build`.
- Verifies that `dist/index.html` contains compiled assets and no raw `main.tsx`.
- Automatically publishes `./dist` to GitHub Pages via official GitHub actions.
