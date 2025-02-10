import React from "react";
import Notif from "./Notif";
import Calander from "./Calander";
import RecentPosts from "./RecentPost";
import UpcomingEvents from "./Events";
import Availability from "../Availability/components/app/Availability";

export default function Dashboard() {
  return (
    <>
      <Notif />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Calander />
          <RecentPosts />
        </div>

        <UpcomingEvents />
        <div className="mt-[50px]">
          <Availability />
        </div>
      </div>
    </>
  );
}
