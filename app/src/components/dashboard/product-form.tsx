"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X, ImagePlus } from "lucide-react";
import type { ProductInput } from "@/lib/validations";
import type { ProductCategory, ProductCondition } from "@/lib/data";
import { getUniqueBrandsBySeller, getCurrentSellerId } from "@/lib/data";

const CATEGORIES: ProductCategory[] = [
  "Dresses",
  "Tops",
  "Bottoms",
  "Swimwear",
  "Accessories",
  "Outerwear",
  "Other",
];

const CONDITIONS: ProductCondition[] = [
  "NWT",
  "NWOT",
  "Like New",
  "Gently Used",
];

interface ProductFormProps {
  onSubmit: (data: ProductInput) => void;
  defaultValues?: Partial<ProductInput>;
}

export function ProductForm({ onSubmit, defaultValues }: ProductFormProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [brand, setBrand] = useState(defaultValues?.brand ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    (defaultValues?.category as ProductCategory) ?? "Dresses"
  );
  const [size, setSize] = useState(defaultValues?.size ?? "");
  const [condition, setCondition] = useState<ProductCondition>(
    (defaultValues?.condition as ProductCondition) ?? "NWT"
  );
  const [priceStr, setPriceStr] = useState(
    defaultValues?.price ? (defaultValues.price / 100).toFixed(2) : ""
  );
  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  );
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? []);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"available" | "draft">(
    (defaultValues?.status as "available" | "draft") ?? "available"
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  const existingBrands = getUniqueBrandsBySeller(getCurrentSellerId());
  const filteredBrands = existingBrands.filter(
    (b) => b.toLowerCase().includes(brand.toLowerCase()) && b !== brand
  );

  function addImage() {
    if (!imageUrl.trim()) return;
    try {
      new URL(imageUrl);
      setImages([...images, imageUrl.trim()]);
      setImageUrl("");
    } catch {
      setErrors({ ...errors, imageUrl: "Please enter a valid URL" });
    }
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceCents = Math.round(parseFloat(priceStr || "0") * 100);
    setErrors({});
    onSubmit({
      name,
      brand,
      category,
      size,
      condition,
      price: priceCents,
      description,
      images,
      status,
    });
  }

  return (
    <form
      id="product-form"
      onSubmit={handleFormSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
    >
      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group"
            >
              <img
                src={url}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {images.length < 8 && (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Paste image URL..."
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setErrors({ ...errors, imageUrl: "" });
            }}
            error={errors.imageUrl}
            className="flex-1"
          />
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Name */}
      <Input
        label="Name"
        id="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Lilly Pulitzer Essie Dress"
        error={errors.name}
      />

      {/* Brand with autocomplete */}
      <div className="relative">
        <Input
          label="Brand"
          id="brand"
          required
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setShowBrandSuggestions(true);
          }}
          onFocus={() => setShowBrandSuggestions(true)}
          onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 150)}
          placeholder="e.g. Lilly Pulitzer"
          error={errors.brand}
        />
        {showBrandSuggestions && filteredBrands.length > 0 && (
          <div className="absolute z-10 top-full mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg py-1 max-h-32 overflow-y-auto">
            {filteredBrands.map((b) => (
              <button
                key={b}
                type="button"
                onMouseDown={() => {
                  setBrand(b);
                  setShowBrandSuggestions(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category & Size */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Size"
          id="size"
          required
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="e.g. S, M, 4, 28"
          error={errors.size}
        />
      </div>

      {/* Condition & Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Condition
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) =>
              setCondition(e.target.value as ProductCondition)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              $
            </span>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0.01"
              required
              value={priceStr}
              onChange={(e) => setPriceStr(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 pl-7 pr-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the item — material, measurements, any flaws..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>

      {/* Status toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStatus("available")}
            className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              status === "available"
                ? "bg-green-50 text-green-700 ring-2 ring-green-500/30"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Available
          </button>
          <button
            type="button"
            onClick={() => setStatus("draft")}
            className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              status === "draft"
                ? "bg-yellow-50 text-yellow-700 ring-2 ring-yellow-500/30"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Draft
          </button>
        </div>
      </div>
    </form>
  );
}
