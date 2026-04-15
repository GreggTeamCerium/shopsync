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
    name: "The Cabana",
    description: "Warm, relaxed, sun-kissed — inspired by Reformation & resort brands",
    colors: { primary: "#1B1B1B", secondary: "#FBF8F4", accent: "#C8956C" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.25rem",
    cardShadow: "none",
    headerStyle: "script",
    previewColors: ["#C8956C", "#FBF8F4", "#1B1B1B"],
  },
  minimal: {
    id: "minimal",
    name: "The Edit",
    description: "Sharp, clean, confident — inspired by Everlane & COS",
    colors: { primary: "#111111", secondary: "#FFFFFF", accent: "#555555" },
    fonts: {
      heading: "var(--font-inter), system-ui, sans-serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0",
    cardShadow: "none",
    headerStyle: "sans",
    previewColors: ["#111111", "#FFFFFF", "#555555"],
  },
  vintage: {
    id: "vintage",
    name: "The Atelier",
    description: "Elevated, editorial, luxe — inspired by Aritzia & NET-A-PORTER",
    colors: { primary: "#1A1A2E", secondary: "#F5F0EB", accent: "#B8860B" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.125rem",
    cardShadow: "0 1px 4px rgba(0,0,0,0.04)",
    headerStyle: "serif",
    previewColors: ["#1A1A2E", "#F5F0EB", "#B8860B"],
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
