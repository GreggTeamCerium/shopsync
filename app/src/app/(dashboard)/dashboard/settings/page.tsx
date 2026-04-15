"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentSeller, updateSeller } from "@/lib/data";
import type { TemplateId } from "@/lib/data";
import { templates } from "@/lib/templates";
import { storeSettingsSchema } from "@/lib/validations";

export default function SettingsPage() {
  const seller = getCurrentSeller();
  const [storeName, setStoreName] = useState(seller.storeName);
  const [storeSlug, setStoreSlug] = useState(seller.storeSlug);
  const [template, setTemplate] = useState<TemplateId>(seller.template);
  const [colors, setColors] = useState(seller.colors);
  const [aboutText, setAboutText] = useState(seller.aboutText);
  const [logo, setLogo] = useState(seller.logo ?? "");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSave() {
    const result = storeSettingsSchema.safeParse({
      storeName,
      storeSlug,
      template,
      colors,
      aboutText,
      logo: logo || null,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const err of result.error.issues) {
        if (err.path[0]) {
          fieldErrors[String(err.path[0])] = err.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    updateSeller(seller.id, {
      storeName: result.data.storeName,
      storeSlug: result.data.storeSlug,
      template: result.data.template,
      colors: result.data.colors,
      aboutText: result.data.aboutText ?? "",
      logo: result.data.logo ?? null,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const templateList = Object.values(templates);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Store Settings</h1>
        <p className="text-gray-600 mt-1">
          Customize your store&apos;s appearance and configuration
        </p>
      </div>

      <div className="space-y-6">
        {/* Store Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">
            Store Information
          </h2>
          <div className="space-y-4 max-w-md">
            <Input
              label="Store Name"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="My Awesome Store"
              error={errors.storeName}
            />
            <div>
              <label
                htmlFor="storeSlug"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Store URL
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500">
                  shopsync.store/
                </span>
                <input
                  id="storeSlug"
                  type="text"
                  value={storeSlug}
                  onChange={(e) => setStoreSlug(e.target.value)}
                  placeholder="my-store"
                  className="flex-1 rounded-r-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {errors.storeSlug && (
                <p className="mt-1 text-sm text-accent">{errors.storeSlug}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Preview:{" "}
                <a
                  href={`/store/${storeSlug}`}
                  className="text-primary hover:underline"
                >
                  /store/{storeSlug}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Template */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">
            Store Template
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {templateList.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplate(t.id);
                  setColors(t.colors);
                }}
                className={`border-2 rounded-xl p-4 text-left transition-colors cursor-pointer ${
                  template === t.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="aspect-[4/3] rounded-lg mb-3 flex items-end gap-1 p-2 overflow-hidden relative">
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: t.previewColors[1] || "#f8fafc" }}
                  />
                  <div className="relative flex gap-1 w-full">
                    {t.previewColors.map((color, i) => (
                      <div
                        key={i}
                        className="h-6 flex-1 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-navy text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {t.description}
                    </p>
                  </div>
                  {template === t.id && (
                    <Check className="h-5 w-5 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">
            Brand Colors
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-md">
            {(["primary", "secondary", "accent"] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">
                  {key}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) =>
                      setColors({ ...colors, [key]: e.target.value })
                    }
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={colors[key]}
                    onChange={(e) =>
                      setColors({ ...colors, [key]: e.target.value })
                    }
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-navy font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About & Logo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">
            About & Branding
          </h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label
                htmlFor="aboutText"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                About Your Store
              </label>
              <textarea
                id="aboutText"
                rows={4}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Tell customers about your store..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            <Input
              label="Logo URL"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        {/* Custom Domain */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-2">
            Custom Domain
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Available on Starter and Pro plans
          </p>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="yourdomain.com"
              disabled
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 justify-end">
          {saved && (
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <Check className="h-4 w-4" />
              Settings saved
            </span>
          )}
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
