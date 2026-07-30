/**
 * Raw values for libraries that parse colors in JavaScript/WebGL and cannot
 * resolve CSS custom properties. Regular components should use the semantic
 * Tailwind color utilities defined in globals.css instead.
 */
export const visualColors = {
  gradientOrange: "#f7a969",
  gradientPeach: "#ffbc85",
  gradientGreen: "#98e694",
  bmiLow: "#7ed957",
  bmiNormal: "#3ccf4e",
  bmiHigh: "#f6c343",
  bmiVeryHigh: "#f44336",
  gaugeNeedle: "#1f1f1f",
  gaugeText: "#333",
} as const;
