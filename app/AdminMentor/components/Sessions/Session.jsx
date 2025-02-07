import React from 'react'
import Dashboard from './components/Dashboard'
import SessionCard from './components/SessionCard'
import CreateSession from './components/CreateSession'
import SessionDetails from './components/SessionDetails'

export default function Session() {
  return (
   <>
   <Dashboard/>
   <SessionCard/>
   <CreateSession/>
   <SessionDetails/>
   </>
  )
}
