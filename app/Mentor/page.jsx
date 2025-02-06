import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
export default function page() {
  return (
    <>
      <Sidebar/>
      <div style={{marginLeft: '270px', marginTop: '50px'}}>
      <Dashboard/>
      </div>
    </>
  )
}
