import React from 'react'
import EventStats from './components/EventStats'
import RecentEvents from './components/RecentEvent'
import EventCalendar from './components/EventCalender'

export default function AllEvent() {
  return (
    <>
    <EventStats/>
    <RecentEvents/>
    <EventCalendar/>
    </>
  )
}
