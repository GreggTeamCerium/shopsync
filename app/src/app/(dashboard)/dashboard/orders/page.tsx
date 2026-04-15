"use client";

import { useState } from "react";
import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { getOrdersBySeller, getCurrentSellerId } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/format";

export default function OrdersPage() {
  const orders = getOrdersBySeller(getCurrentSellerId());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-navy mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            When customers purchase from your store, their orders will appear
            here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Items
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Total
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setExpandedId(
                          expandedId === order.id ? null : order.id
                        )
                      }
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-navy">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customerEmail}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-navy">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {expandedId === order.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </td>
                    </tr>
                    {expandedId === order.id && (
                      <tr key={`${order.id}-detail`}>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-500 uppercase">
                              Order Items
                            </p>
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-navy">
                                  {item.name}{" "}
                                  <span className="text-gray-400">
                                    (Size: {item.size})
                                  </span>
                                </span>
                                <span className="font-medium text-navy">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                              <span className="font-semibold text-navy">
                                Total
                              </span>
                              <span className="font-semibold text-navy">
                                {formatPrice(order.total)}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id}>
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === order.id ? null : order.id
                    )
                  }
                  className="w-full p-4 text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-navy text-sm">
                      {order.customerName}
                    </p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {formatDate(order.createdAt)} &middot;{" "}
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                    <p className="text-sm font-semibold text-navy">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </button>
                {expandedId === order.id && (
                  <div className="px-4 pb-4">
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-navy">{item.name}</span>
                          <span className="font-medium text-navy">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrderStatusBadge({ status }: { status: "completed" | "refunded" }) {
  const styles = {
    completed: "bg-green-50 text-green-700",
    refunded: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
