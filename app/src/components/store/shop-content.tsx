"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Product, ProductCategory, Seller } from "@/lib/data";
import type { TemplateConfig } from "@/lib/templates";
import { ProductCard } from "@/components/store/product-card";

const CONDITIONS = ["NWT", "NWOT", "Like New", "Gently Used"] as const;

type SortOption = "newest" | "price-low" | "price-high";

interface ShopContentProps {
  seller: Seller;
  products: Product[];
  template: TemplateConfig;
  colors: { primary: string; secondary: string; accent: string };
  initialCategory?: string;
}

export function ShopContent({
  seller,
  products,
  template,
  colors,
  initialCategory,
}: ShopContentProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory || "all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const availableCategories = Array.from(
    new Set(products.map((p) => p.category))
  );

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (conditionFilter !== "all") {
      result = result.filter((p) => p.condition === conditionFilter);
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [search, categoryFilter, conditionFilter, sort, products]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: template.fonts.heading,
          color: colors.primary,
        }}
      >
        Shop
      </h2>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: `${colors.primary}60` }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: `${colors.primary}30`,
              color: colors.primary,
              borderRadius: template.borderRadius,
            }}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border rounded-lg"
          style={{
            borderColor: `${colors.primary}30`,
            color: colors.primary,
            borderRadius: template.borderRadius,
          }}
        >
          <option value="all">All Categories</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border rounded-lg"
          style={{
            borderColor: `${colors.primary}30`,
            color: colors.primary,
            borderRadius: template.borderRadius,
          }}
        >
          <option value="all">All Conditions</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-3 py-2.5 text-sm border rounded-lg"
          style={{
            borderColor: `${colors.primary}30`,
            color: colors.primary,
            borderRadius: template.borderRadius,
          }}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: `${colors.primary}60` }}>
            No products found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              storeSlug={seller.storeSlug}
              template={template}
              colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  );
}
