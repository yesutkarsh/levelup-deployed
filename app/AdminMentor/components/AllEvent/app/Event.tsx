import Layout from "../components/layout"
import Header from "../components/header"
import EventStats from "../components/event-stats"
import EventCalendar from "../components/event-calendar"
import RecentEvents from "../components/recent-events"
import EventsTable from "../components/events-table"

export default function EventsPage() {
  return (
    <Layout>
      <Header />
      <EventStats />
      <EventCalendar />
      <RecentEvents />
      <EventsTable />
    </Layout>
  )
}
