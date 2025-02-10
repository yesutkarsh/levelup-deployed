"use client";

import AvailabilityForm from "@/components/AvailabilityForm";
import AvailabilityOverview from "@/components/AvailabilityOverview";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="p-8">
          <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
            <AvailabilityForm />
          </div>
          <AvailabilityOverview />
        </main>
      </div>
    </div>
  );
}
