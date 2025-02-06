import React from "react";
import Notif from "./Notif";
import Calander from "./Calander";
import RecentPosts from "./RecentPost";
import UpcomingEvents from "./Events";
import MentorAvailability from "./MentorAvailibility";
export default function Dashboard() {
  return (
    <>
      <Notif />

      <div>
<div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
}}>
    <Calander />
    <RecentPosts />
</div>

<UpcomingEvents/>
<MentorAvailability/>

    </div>
    </>
  );
}
