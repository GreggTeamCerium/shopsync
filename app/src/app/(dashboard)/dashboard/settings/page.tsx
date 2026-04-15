import type { Metadata } from "next";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Store Settings — ShopSync",
};

export default function SettingsPage() {
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Store Name
              </label>
              <input
                type="text"
                placeholder="My Awesome Store"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Store URL
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500">
                  shopsync.store/
                </span>
                <input
                  type="text"
                  placeholder="my-store"
                  className="flex-1 rounded-r-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Template */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">
            Store Template
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Resort", "Minimal", "Vintage"].map((name) => (
              <div
                key={name}
                className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-primary cursor-pointer transition-colors"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Settings className="h-8 w-8 text-gray-300" />
                </div>
                <p className="font-medium text-navy text-sm">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
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
      </div>
    </div>
  );
}
