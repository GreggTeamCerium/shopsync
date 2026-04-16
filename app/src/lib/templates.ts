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
  gallery: {
    id: "gallery",
    name: "The Gallery",
    description: "All-white, gallery-style grid — inspired by Zara & COS",
    colors: { primary: "#1A1A1A", secondary: "#FFFFFF", accent: "#E5E5E5" },
    fonts: {
      heading: "var(--font-inter), system-ui, sans-serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0",
    cardShadow: "none",
    headerStyle: "sans",
    previewColors: ["#1A1A1A", "#FFFFFF", "#E5E5E5"],
  },
  collective: {
    id: "collective",
    name: "The Collective",
    description: "Earthy & organic — sustainable fashion, natural tones",
    colors: { primary: "#2D3B2D", secondary: "#F7F5F0", accent: "#8B9D83" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.5rem",
    cardShadow: "0 2px 8px rgba(0,0,0,0.04)",
    headerStyle: "serif",
    previewColors: ["#2D3B2D", "#F7F5F0", "#8B9D83"],
  },
  studio: {
    id: "studio",
    name: "The Studio",
    description: "Modern feminine — charcoal meets soft blush",
    colors: { primary: "#2C2C2C", secondary: "#FFF5F5", accent: "#D4A0A0" },
    fonts: {
      heading: "var(--font-inter), system-ui, sans-serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.75rem",
    cardShadow: "0 4px 16px rgba(0,0,0,0.05)",
    headerStyle: "sans",
    previewColors: ["#2C2C2C", "#FFF5F5", "#D4A0A0"],
  },
  market: {
    id: "market",
    name: "The Market",
    description: "Classic Americana — navy & warm white, timeless",
    colors: { primary: "#1E3A5F", secondary: "#FAFAF7", accent: "#C1926E" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.25rem",
    cardShadow: "0 1px 6px rgba(0,0,0,0.06)",
    headerStyle: "serif",
    previewColors: ["#1E3A5F", "#FAFAF7", "#C1926E"],
  },
  vault: {
    id: "vault",
    name: "The Vault",
    description: "Luxury & high-end — black & gold, premium consignment",
    colors: { primary: "#D4AF37", secondary: "#0A0A0A", accent: "#8B7355" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0",
    cardShadow: "0 2px 10px rgba(0,0,0,0.3)",
    headerStyle: "serif",
    previewColors: ["#D4AF37", "#0A0A0A", "#8B7355"],
  },
  bloom: {
    id: "bloom",
    name: "The Bloom",
    description: "Soft & delicate — lavender & ivory, feminine boutique",
    colors: { primary: "#4A3B5C", secondary: "#FAF8FF", accent: "#B8A9C9" },
    fonts: {
      heading: "var(--font-playfair), Georgia, serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "1rem",
    cardShadow: "0 4px 20px rgba(74,59,92,0.06)",
    headerStyle: "script",
    previewColors: ["#4A3B5C", "#FAF8FF", "#B8A9C9"],
  },
  boardwalk: {
    id: "boardwalk",
    name: "The Boardwalk",
    description: "Coastal & casual — sandy tones & ocean blues",
    colors: { primary: "#2B4F72", secondary: "#FDF8F3", accent: "#C4A882" },
    fonts: {
      heading: "var(--font-inter), system-ui, sans-serif",
      body: "var(--font-inter), system-ui, sans-serif",
    },
    borderRadius: "0.5rem",
    cardShadow: "0 2px 12px rgba(0,0,0,0.04)",
    headerStyle: "sans",
    previewColors: ["#2B4F72", "#FDF8F3", "#C4A882"],
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
