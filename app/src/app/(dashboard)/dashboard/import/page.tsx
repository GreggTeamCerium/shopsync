import type { Metadata } from "next";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Import from Instagram — ShopSync",
};

export default function ImportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">
          Import from Instagram
        </h1>
        <p className="text-gray-600 mt-1">
          Connect your Instagram to auto-import products
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-6">
          <Camera className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-navy mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
          We&apos;re building the Instagram integration. Soon you&apos;ll be
          able to connect your account and auto-import all your products with
          AI-powered parsing.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
          Launching Phase 2
        </div>
      </div>
    </div>
  );
}
