import type { TemplateId } from "./data/types";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  colors: { primary: string; secondary: string; accent: string };
  fonts: { heading: string; body: string };
  borderRadius: string;
  cardShadow: string;
  headerStyle: "script" | "sans" | "serif";
  previewColors: [string, string, string]; // For template preview cards
}

export const templates: Record<TemplateId, TemplateConfig> = {
  resort: {
    id: "resort",
    name: "Resort",
    description: "Pink & green tropical vibe — Lilly Pulitzer inspired",
    colors: { primary: "#FF3E9A", secondary: "#18B35D", accent: "#D4A853" },
    fonts: {
      heading: "'Georgia', serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "1rem",
    cardShadow: "0 4px 20px rgba(0,0,0,0.08)",
    headerStyle: "script",
    previewColors: ["#FF3E9A", "#18B35D", "#D4A853"],
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Clean black & white editorial feel",
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#6B7280" },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "0",
    cardShadow: "none",
    headerStyle: "sans",
    previewColors: ["#000000", "#FFFFFF", "#6B7280"],
  },
  vintage: {
    id: "vintage",
    name: "Vintage",
    description: "Warm rust & cream curated boutique",
    colors: { primary: "#C2410C", secondary: "#FEF3C7", accent: "#365314" },
    fonts: {
      heading: "'Georgia', serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "0.5rem",
    cardShadow: "0 2px 10px rgba(0,0,0,0.06)",
    headerStyle: "serif",
    previewColors: ["#C2410C", "#FEF3C7", "#365314"],
  },
};

export function getTemplate(id: TemplateId): TemplateConfig {
  return templates[id];
}

export function getEffectiveColors(
  templateId: TemplateId,
  sellerColors?: { primary: string; secondary: string; accent: string }
): { primary: string; secondary: string; accent: string } {
  const template = templates[templateId];
  if (
    sellerColors &&
    sellerColors.primary !== template.colors.primary
  ) {
    return sellerColors;
  }
  return template.colors;
}
