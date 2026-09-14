import { LabExperiment } from '../types';

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'lab-curve-fitting',
    date: '13 September 2026',
    title: 'Curve Fitting & Least-Squares Regression Analysis of Thermal Resistance',
    experiment: 'Negative Temperature Coefficient (NTC) Thermistor Characterization',
    category: 'Data Analysis & Thermodynamics',
    question: 'How accurately does the non-linear Steinhart-Hart equation model experimental resistance-temperature data compared to a simplified single-parameter exponential model?',
    hypothesis: 'The Steinhart-Hart model 1/T = A + B ln(R) + C(ln R)³ will produce residuals with root-mean-square error < 0.05 K, significantly outperforming the simplified two-parameter exponential model R(T) = R_0 exp(β(1/T - 1/T_0)).',
    theory: 'In doped semiconductor thermistors, electrical conduction is governed by thermally excited electron-hole pairs across the energy bandgap. The temperature dependence of resistance R follows the Steinhart-Hart third-order polynomial in ln(R).',
    setup: 'A high-precision 10 kΩ NTC bead thermistor immersed in a calibrated silicone oil bath alongside a reference PT100 RTD sensor (±0.02 °C precision). Measurements taken across 20 °C to 90 °C in 10 °C increments using a 6.5-digit digital multimeter in 4-wire Kelvin configuration.',
    dataPoints: [
      { x: 20.0, y: 12490, uncertaintyY: 15 },
      { x: 30.0, y: 8060, uncertaintyY: 12 },
      { x: 40.0, y: 5325, uncertaintyY: 9 },
      { x: 50.0, y: 3602, uncertaintyY: 7 },
      { x: 60.0, y: 2490, uncertaintyY: 5 },
      { x: 70.0, y: 1756, uncertaintyY: 4 },
      { x: 80.0, y: 1260, uncertaintyY: 3 },
      { x: 90.0, y: 918, uncertaintyY: 2 }
    ],
    xLabel: 'Temperature T (°C)',
    yLabel: 'Thermistor Resistance R (Ω)',
    fitType: 'exponential',
    fitEquation: 'R(T) = R_0 \\cdot e^{\\beta (1/T - 1/T_0)}',
    fitResults: [
      { parameter: 'β Parameter', value: '3892 K', error: '± 14 K' },
      { parameter: 'R_0 (at 298.15 K)', value: '10014 Ω', error: '± 28 Ω' }
    ],
    rSquared: 0.9994,
    uncertaintyAnalysis: 'The largest source of error was thermal equilibrium stabilization time in the oil bath (~4 minutes per step required). 4-wire Kelvin sensing eliminated test lead resistance errors (< 0.05 Ω).',
    conclusion: 'The exponential β-model fits the experimental data across the 20–90 °C range with an R² of 0.9994. The Steinhart-Hart model reduced maximum temperature residuals to under 0.04 K, fully verifying the hypothesis.',
    notes: 'Repeat with cryogenic temperatures in liquid nitrogen (77 K) to investigate low-temperature freeze-out regimes in future work.'
  },
  {
    id: 'lab-arduino-logic',
    date: '08 September 2026',
    title: 'TTL Logic Gate Timing & Arduino 4-Bit Binary Adder Interfacing',
    experiment: 'Combinational Logic Ripple Propagation & Propagation Delay Benchmarking',
    category: 'Electronics & Computing',
    question: 'What is the empirical propagation delay of a 4-bit ripple-carry adder constructed from discrete 74LS series gates, and does it scale linearly with bit width?',
    hypothesis: 'Each additional 1-bit full adder stage will introduce approximately 10 to 12 ns of carry propagation delay, resulting in a total delay between input toggle and final carry-out of ~45 ns.',
    theory: 'In a ripple-carry architecture, the carry bit must sequentially propagate through all stages before the most significant sum bit and carry-out bit stabilize. For n bits, maximum delay is t_total = (n - 1) t_carry + max(t_carry, t_sum).',
    setup: 'Texas Instruments 74LS86 (XOR), 74LS08 (AND), and 74LS32 (OR) dual-in-line ICs assembled on solderless breadboards with common ground plane and 100 nF decoupling capacitors across VCC and GND pins. Test vector generator driven by Arduino Uno ATmega328P.',
    dataPoints: [
      { x: 1, y: 11.2, uncertaintyY: 0.8 },
      { x: 2, y: 21.8, uncertaintyY: 0.9 },
      { x: 3, y: 32.4, uncertaintyY: 1.1 },
      { x: 4, y: 42.1, uncertaintyY: 1.2 }
    ],
    xLabel: 'Number of Bits (n)',
    yLabel: 'Carry Propagation Delay (ns)',
    fitType: 'linear',
    fitEquation: 't_{\\text{prop}}(n) = m \\cdot n + c',
    fitResults: [
      { parameter: 'Per-bit delay (m)', value: '10.3 ns/bit', error: '± 0.2 ns' },
      { parameter: 'Initial offset (c)', value: '1.1 ns', error: '± 0.4 ns' }
    ],
    rSquared: 0.9991,
    uncertaintyAnalysis: 'Propagation delays were captured using a 100 MHz digital storage oscilloscope with 10× high-impedance probes. Stray breadboard capacitance (~2–4 pF per tie point) introduced slight additional delays compared to standalone PCB traces.',
    conclusion: 'The measured per-bit delay of 10.3 ± 0.2 ns/bit agrees with Texas Instruments 74LS08/74LS32 propagation specifications (typical 9–11 ns). Total 4-bit carry propagation settled in 42.1 ns.',
    notes: 'To eliminate ripple delay in wider ALUs (e.g. 16 or 32 bit), carry-lookahead architectures (such as 74LS182 CLA generator) should be utilized.'
  },
  {
    id: 'lab-photoelectric',
    date: '01 September 2026',
    title: 'Determination of Planck Constant via Photoelectric Effect',
    experiment: 'Spectral Line Stopping Potential Method',
    category: 'Quantum Physics',
    question: 'Can the fundamental Planck constant h be extracted within 2% error using five visible and near-UV mercury spectral lines?',
    hypothesis: 'Linear regression of stopping potential V₀ against light frequency ν will yield a slope proportional to h/e, reproducing Planck\'s constant within experimental uncertainty.',
    theory: 'Einstein\'s relation V₀ = (h/e)ν - Φ/e indicates that the slope of V₀ versus frequency ν is universal and independent of cathode material, while the y-intercept reveals the work function Φ.',
    setup: 'PASCO Scientific SE-9721 photoelectric apparatus with mercury vapor source, optical transmission filters (365 nm, 404 nm, 436 nm, 546 nm, 578 nm), and ultra-low noise electrometer with < 10⁻¹³ A input bias current.',
    dataPoints: [
      { x: 5.187e14, y: 0.41, uncertaintyY: 0.02 },
      { x: 5.490e14, y: 0.54, uncertaintyY: 0.02 },
      { x: 6.880e14, y: 1.12, uncertaintyY: 0.03 },
      { x: 7.408e14, y: 1.34, uncertaintyY: 0.03 },
      { x: 8.214e14, y: 1.66, uncertaintyY: 0.04 }
    ],
    xLabel: 'Frequency ν (Hz)',
    yLabel: 'Stopping Potential V₀ (V)',
    fitType: 'linear',
    fitEquation: 'V_0 = \\left( \\frac{h}{e} \\right) \\nu - \\frac{\\Phi}{e}',
    fitResults: [
      { parameter: 'Slope (h/e)', value: '4.08 × 10⁻¹⁵ V·s', error: '± 0.11 × 10⁻¹⁵ V·s' },
      { parameter: 'Extracted h', value: '6.54 × 10⁻³⁴ J·s', error: '± 0.18 × 10⁻³⁴ J·s' },
      { parameter: 'Work Function Φ', value: '2.21 eV', error: '± 0.06 eV' }
    ],
    rSquared: 0.9984,
    uncertaintyAnalysis: 'Ambient room light leakage and reverse leakage currents in the phototube cathode are the dominant systematic error sources. A light-tight shielding tube reduced dark current to < 2 pA.',
    conclusion: 'The extracted Planck constant h = (6.54 ± 0.18) × 10⁻³⁴ J·s matches the accepted value 6.626 × 10⁻³⁴ J·s within a 1.3% relative deviation, confirming quantum photon theory over classical electrodynamics.',
    notes: 'High school and introductory textbooks often omit the contact potential difference between cathode and collector, which shifts the absolute voltage intercept by ~0.3 V.'
  },
  {
    id: 'lab-rc-transient',
    date: '22 August 2026',
    title: 'RC Circuit Charging Dynamics & Time Constant Determination',
    experiment: 'Oscilloscope Transient Acquisition & Logarithmic Linearization',
    category: 'Electronics & Circuit Analysis',
    question: 'How do dielectric material differences in ceramic vs electrolytic capacitors affect the actual transient discharge curve compared to ideal exponential behavior?',
    hypothesis: 'Ceramic multi-layer capacitors will exhibit near-perfect exponential decay with minimal dielectric absorption, whereas electrolytic capacitors will display a subtle slow-decay tail due to dielectric relaxation.',
    theory: 'Charging voltage V_C(t) = V_0(1 - e^{-t/RC}). At t = τ = RC, the capacitor charges to 1 - e⁻¹ ≈ 63.2% of supply voltage V_0.',
    setup: 'Signal generator supplying 1 kHz square wave at 0 to 5.0 V into a precision metal film resistor (R = 4.70 kΩ ± 0.1%) and test capacitor. Digital storage oscilloscope with automated cursor measurement.',
    dataPoints: [
      { x: 0.0, y: 0.00, uncertaintyY: 0.05 },
      { x: 0.2, y: 1.76, uncertaintyY: 0.05 },
      { x: 0.5, y: 3.25, uncertaintyY: 0.05 },
      { x: 1.0, y: 4.41, uncertaintyY: 0.05 },
      { x: 1.5, y: 4.80, uncertaintyY: 0.05 },
      { x: 2.0, y: 4.93, uncertaintyY: 0.05 },
      { x: 3.0, y: 4.99, uncertaintyY: 0.05 }
    ],
    xLabel: 'Time t (ms)',
    yLabel: 'Capacitor Voltage V_C (V)',
    fitType: 'exponential',
    fitEquation: 'V_C(t) = V_0 (1 - e^{-t / \\tau})',
    fitResults: [
      { parameter: 'Time Constant τ', value: '0.468 ms', error: '± 0.006 ms' },
      { parameter: 'Extracted C', value: '99.6 nF', error: '± 1.3 nF' }
    ],
    rSquared: 0.9996,
    uncertaintyAnalysis: 'Oscilloscope probe internal capacitance (13 pF on 10× probe mode) represented less than 0.02% of total capacitance, having negligible effect on the measurement.',
    conclusion: 'The measured time constant of 0.468 ms corresponds to an effective capacitance of 99.6 nF (nominal 100 nF ± 5%), in strong agreement with specifications. Electrolytic units demonstrated measurable dielectric absorption tails.',
    notes: 'Useful laboratory reference for designing analog RC low-pass filters and debounce circuitry.'
  }
];
