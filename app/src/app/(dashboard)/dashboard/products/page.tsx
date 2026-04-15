"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Plus, Pencil, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getProductsBySeller,
  getCurrentSellerId,
  updateProduct,
  deleteProduct,
} from "@/lib/data";
import type { Product, ProductStatus } from "@/lib/data";
import { formatPrice } from "@/lib/format";

type FilterStatus = "all" | ProductStatus;

export default function ProductsPage() {
  const sellerId = getCurrentSellerId();
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [productList, setProductList] = useState<Product[]>(() =>
    getProductsBySeller(sellerId)
  );
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmSold, setConfirmSold] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? productList
      : productList.filter((p) => p.status === filter);

  function handleMarkSold(id: string) {
    updateProduct(id, { status: "sold" });
    setProductList(getProductsBySeller(sellerId));
    setConfirmSold(null);
  }

  function handleDelete(id: string) {
    deleteProduct(id);
    setProductList(getProductsBySeller(sellerId));
    setConfirmDelete(null);
  }

  const filters: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Available", value: "available" },
    { label: "Sold", value: "sold" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button size="md">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              filter === f.value
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-navy mb-2">
            {filter === "all" ? "No products yet" : `No ${filter} products`}
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
            Add your first product to get started. You can add products manually
            or import them from Instagram.
          </p>
          <Link href="/dashboard/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Product
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Brand
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Size
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Condition
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Price
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-navy text-sm">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.size}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.condition}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-navy">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        {product.status !== "sold" && (
                          <button
                            onClick={() => setConfirmSold(product.id)}
                            className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            title="Mark as sold"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setConfirmDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-accent rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {filtered.map((product) => (
              <div key={product.id} className="p-4 flex gap-3">
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-navy text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.brand} &middot; {product.size} &middot;{" "}
                        {product.condition}
                      </p>
                    </div>
                    <StatusBadge status={product.status} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-navy text-sm">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/dashboard/products/${product.id}/edit`}
                        className="p-1.5 text-gray-400 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {product.status !== "sold" && (
                        <button
                          onClick={() => setConfirmSold(product.id)}
                          className="p-1.5 text-gray-400 hover:text-green-600 cursor-pointer"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setConfirmDelete(product.id)}
                        className="p-1.5 text-gray-400 hover:text-accent cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mark as Sold Dialog */}
      {confirmSold && (
        <ConfirmDialog
          title="Mark as Sold"
          message={`Mark "${productList.find((p) => p.id === confirmSold)?.name}" as sold?`}
          confirmLabel="Mark as Sold"
          onConfirm={() => handleMarkSold(confirmSold)}
          onCancel={() => setConfirmSold(null)}
        />
      )}

      {/* Delete Dialog */}
      {confirmDelete && (
        <ConfirmDialog
          title="Delete Product"
          message="Are you sure? This cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    available: "bg-green-50 text-green-700",
    sold: "bg-gray-100 text-gray-600",
    draft: "bg-yellow-50 text-yellow-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  variant = "default",
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  variant?: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant={variant === "danger" ? "accent" : "primary"}
            size="sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
