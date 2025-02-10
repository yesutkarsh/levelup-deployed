"use client";

import { ScheduleProvider } from "../components/ScheduleContext"; // ✅ Correct import
import AvailabilityForm from "../components/AvailabilityForm";
import AvailabilityOverview from "../components/AvailabilityOverview";

export default function Availability() {
  return (
    <ScheduleProvider>
      {" "}
      {/* ✅ Ensure Availability is wrapped in ScheduleProvider */}
      <div className="flex min-h-screen -mt-[30px]">
        <div className="flex-1">
          <main className="p-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <AvailabilityForm />
            </div>
            <AvailabilityOverview />
          </main>
        </div>
      </div>
    </ScheduleProvider>
  );
}
