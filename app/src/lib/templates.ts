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
    description: "Tropical & feminine — warm pastels with bold pops",
    colors: { primary: "#E8447A", secondary: "#0D9488", accent: "#F59E0B" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "1rem",
    cardShadow: "0 4px 20px rgba(0,0,0,0.08)",
    headerStyle: "script",
    previewColors: ["#E8447A", "#0D9488", "#F59E0B"],
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Modern & clean — sharp lines, confident contrast",
    colors: { primary: "#18181B", secondary: "#FAFAFA", accent: "#A1A1AA" },
    fonts: {
      heading: "'Inter', system-ui, sans-serif",
      body: "'Inter', system-ui, sans-serif",
    },
    borderRadius: "0.25rem",
    cardShadow: "0 1px 3px rgba(0,0,0,0.06)",
    headerStyle: "sans",
    previewColors: ["#18181B", "#FAFAFA", "#A1A1AA"],
  },
  vintage: {
    id: "vintage",
    name: "Vintage",
    description: "Warm & curated — deep rose meets soft linen",
    colors: { primary: "#9F1239", secondary: "#FAF5EF", accent: "#78716C" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.5rem",
    cardShadow: "0 2px 12px rgba(0,0,0,0.05)",
    headerStyle: "serif",
    previewColors: ["#9F1239", "#FAF5EF", "#78716C"],
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
