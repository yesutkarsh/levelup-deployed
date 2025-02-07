import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Components/Dashboard'
import Session from './Components/Sessions'
import CreateSession from './Components/CreateSession'
import SessionDetails from './Components/SessionDetails'
import SideBar from './Components/SideBar'

function App() {

  return (
    <>
     <Dashboard/>
     <Session/> 
     <CreateSession/> 
     <SessionDetails/>
    </>
  )
}

export default App
