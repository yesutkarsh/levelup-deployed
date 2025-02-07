"use client"
import React from 'react'
import Dashboard from './components/Dashboard/Dashboard'
// import Sessions from './components/Sessions/Sessions'  // You'll need to create these components
// import Availability from './components/Availability/Availability'
// import Events from './components/Events/Events'
// import Posts from './components/Posts/Posts'
// import Analytics from './components/Analytics/Analytics'
import { useState } from 'react';
import styles from './style.module.css';
import Session from './components/Sessions/Session';
import AllEvent from './components/AllEvent/AllEvent';

const Sidebar = ({ activeOption, setActiveOption }) => {
  const sidebarOptions = [
    { id: 0, label: 'Dashboard', icon: '📊' },
    { id: 1, label: 'Sessions', icon: '👤' },
    { id: 2, label: 'Events', icon: '⚙️' },
  ];

  const handleOptionClick = (id) => {
    setActiveOption(id);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {sidebarOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`${styles.option} ${activeOption === option.id ? styles.active : ''}`}
          >
            <span className={styles.icon}>
              {option.icon}
            </span>
            <span className={`${styles.label} ${activeOption === option.id ? styles.activeLabel : ''}`}>
              {option.label}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const renderComponent = (activeOption) => {
  switch (activeOption) {
    case 0:
      return <Dashboard />;
    case 1:
      return <Session/>;
    case 2:
      return <AllEvent/>;
    default:
      return <Dashboard />;
  }
};

export default function Page() {
  const [activeOption, setActiveOption] = useState(0);

  return (
    <>
      <Sidebar activeOption={activeOption} setActiveOption={setActiveOption} />
      <div style={{marginLeft: '270px', marginTop: '50px'}}>
        {renderComponent(activeOption)}
      </div>
    </>
  );
}